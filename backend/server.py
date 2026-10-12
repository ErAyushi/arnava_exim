from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import logging
import os
import re
from datetime import datetime, timezone
from typing import List, Optional

import bcrypt
import jwt
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request, Response
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Arnava Exim API")
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_SECONDS = 900
REFRESH_TOKEN_SECONDS = 604800
MAX_ATTEMPTS = 5
LOCK_SECONDS = 900

logger = logging.getLogger("arnava")


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc).timestamp() + ACCESS_TOKEN_SECONDS,
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc).timestamp() + REFRESH_TOKEN_SECONDS,
        "type": "refresh",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, user_id: str, email: str) -> None:
    response.set_cookie(
        key="access_token",
        value=create_access_token(user_id, email),
        httponly=True,
        secure=True,
        samesite="none",
        max_age=ACCESS_TOKEN_SECONDS,
        path="/",
    )
    response.set_cookie(
        key="refresh_token",
        value=create_refresh_token(user_id),
        httponly=True,
        secure=True,
        samesite="none",
        max_age=REFRESH_TOKEN_SECONDS,
        path="/",
    )


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "name": user.get("name", "Admin"),
        "role": user.get("role", "admin"),
    }


async def is_locked(identifier: str) -> bool:
    rec = await db.login_attempts.find_one({"identifier": identifier})
    if not rec:
        return False
    return rec.get("attempts", 0) >= MAX_ATTEMPTS and rec.get("locked_until", 0) > datetime.now(timezone.utc).timestamp()


async def register_failure(identifier: str) -> None:
    now = datetime.now(timezone.utc).timestamp()
    rec = await db.login_attempts.find_one({"identifier": identifier})
    attempts = (rec.get("attempts", 0) if rec else 0) + 1
    update = {"identifier": identifier, "attempts": attempts, "last_attempt": now}
    if attempts >= MAX_ATTEMPTS:
        update["locked_until"] = now + LOCK_SECONDS
    await db.login_attempts.update_one({"identifier": identifier}, {"$set": update}, upsert=True)


async def seed_admin() -> None:
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one(
            {
                "email": admin_email,
                "password_hash": hash_password(admin_password),
                "name": "Arnava Admin",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )
        logger.info("Admin user seeded: %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info("Admin password updated from env for: %s", admin_email)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class InquiryCreate(BaseModel):
    form_type: str = "inquiry"
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company_name: Optional[str] = ""
    phone: Optional[str] = ""
    country: Optional[str] = ""
    product: Optional[str] = ""
    purity: Optional[str] = ""
    quantity: Optional[str] = ""
    destination_port: Optional[str] = ""
    incoterm: Optional[str] = ""
    message: Optional[str] = ""


class InquiryStatusUpdate(BaseModel):
    status: str


class ProductIn(BaseModel):
    name: str = Field(min_length=2, max_length=160)
    slug: Optional[str] = ""
    tier: Optional[str] = ""
    purity: Optional[str] = ""
    badge: Optional[str] = ""
    image: Optional[str] = ""
    alt: Optional[str] = ""
    short: Optional[str] = ""
    description: Optional[str] = ""
    points: List[str] = []
    order: int = 0


def slugify(text: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", text.lower())).strip("-")


async def unique_slug(base: str) -> str:
    slug = base or "product"
    candidate = slug
    n = 2
    while await db.products.find_one({"slug": candidate}):
        candidate = f"{slug}-{n}"
        n += 1
    return candidate


def serialize_inquiry(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "form_type": doc.get("form_type", "inquiry"),
        "full_name": doc.get("full_name", ""),
        "email": doc.get("email", ""),
        "company_name": doc.get("company_name", ""),
        "phone": doc.get("phone", ""),
        "country": doc.get("country", ""),
        "product": doc.get("product", ""),
        "purity": doc.get("purity", ""),
        "quantity": doc.get("quantity", ""),
        "destination_port": doc.get("destination_port", ""),
        "incoterm": doc.get("incoterm", ""),
        "message": doc.get("message", ""),
        "status": doc.get("status", "new"),
        "created_at": doc.get("created_at", ""),
    }


def serialize_product(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc.get("name", ""),
        "slug": doc.get("slug", ""),
        "tier": doc.get("tier", ""),
        "purity": doc.get("purity", ""),
        "badge": doc.get("badge", ""),
        "image": doc.get("image", ""),
        "alt": doc.get("alt", ""),
        "short": doc.get("short", ""),
        "description": doc.get("description", ""),
        "points": doc.get("points", []),
        "order": doc.get("order", 0),
        "created_at": doc.get("created_at", ""),
    }


PRODUCT_SEED = [
    {
        "slug": "psyllium-husk",
        "name": "Psyllium Husk",
        "tier": "Classic Grade",
        "purity": "As per buyer requirement",
        "badge": "Conventional",
        "image": "https://images.unsplash.com/photo-1676619357571-b4f086f81299?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxwc3lsbGl1bSUyMGh1c2slMjBwbGFudCUyMGdyYWluJTIwc2VlZHMlMjBhZ3JpY3VsdHVyYWwlMjB0cmFkZXxlbnwwfHx8fDE3OTA4NzgwNDF8MA&ixlib=rb-4.1.0&q=85",
        "alt": "Psyllium husk — natural dietary fiber exported from India by Arnava Exim",
        "short": "Conventional psyllium husk in different purity grades, sourced according to buyer requirements.",
        "description": "Whole psyllium husk derived from the seeds of Plantago ovata, sourced from trusted Indian supply partners. Available in conventional options and different purity grades according to buyer requirements. Suitable for food, nutraceutical and industrial applications where applicable.",
        "points": [
            "Conventional options available",
            "Different purity grades as per buyer requirement",
            "Suitable for food, nutraceutical and industrial applications where applicable",
        ],
        "order": 1,
    },
    {
        "slug": "psyllium-husk-powder",
        "name": "Psyllium Husk Powder",
        "tier": "Milled Grade",
        "purity": "As per buyer requirement",
        "badge": "Fine Powder",
        "image": "https://images.pexels.com/photos/11789292/pexels-photo-11789292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "alt": "Psyllium husk powder — finely milled psyllium supplied by Arnava Exim, India",
        "short": "Fine psyllium husk powder in different purity and mesh specifications.",
        "description": "Finely milled psyllium husk powder supplied in different purity and mesh specifications according to buyer requirements. Fine powder options and buyer-specific specifications are available on inquiry.",
        "points": [
            "Different purity and mesh specifications",
            "Fine powder options",
            "Buyer-specific specifications available",
        ],
        "order": 2,
    },
    {
        "slug": "psyllium-husk-95",
        "name": "Psyllium Husk 95%",
        "tier": "Select 95",
        "purity": "95%",
        "badge": "95% Purity",
        "image": "https://images.unsplash.com/photo-1645331465778-eb409d112198?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxwc3lsbGl1bSUyMGh1c2slMjBwbGFudCUyMGdyYWluJTIwc2VlZHMlMjBhZ3JpY3VsdHVyYWwlMjB0cmFkZXxlbnwwfHx8fDE3OTA4NzgwNDF8MA&ixlib=rb-4.1.0&q=85",
        "alt": "Psyllium husk 95 percent purity grade — Indian psyllium supplier Arnava Exim",
        "short": "Psyllium husk at 95% purity for buyers seeking a balanced commercial grade.",
        "description": "Psyllium husk at 95% purity, a widely traded commercial grade for food and nutraceutical applications where applicable. Full specifications are shared against buyer requirements and confirmed before order finalization.",
        "points": [
            "95% purity grade",
            "Widely used commercial grade",
            "Specification sheet shared on inquiry",
        ],
        "order": 3,
    },
    {
        "slug": "psyllium-husk-99",
        "name": "Psyllium Husk 99%",
        "tier": "Prime 99",
        "purity": "99%",
        "badge": "99% Purity",
        "image": "https://images.unsplash.com/photo-1755598603555-949ce8bb3b50?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxwc3lsbGl1bSUyMGh1c2slMjBwbGFudCUyMGdyYWluJTIwc2VlZHMlMjBhZ3JpY3VsdHVyYWwlMjB0cmFkZXxlbnwwfHx8fDE3OTA4NzgwNDF8MA&ixlib=rb-4.1.0&q=85",
        "alt": "Psyllium husk 99 percent high purity grade — psyllium husk exporter India Arnava Exim",
        "short": "High-purity psyllium husk at 99% for premium food and nutraceutical applications.",
        "description": "High-purity psyllium husk at 99%, suited to premium food and nutraceutical applications where applicable. Specifications, documentation and packaging are coordinated to match buyer and destination-country requirements.",
        "points": [
            "99% high-purity grade",
            "Suited to premium applications where applicable",
            "Documentation coordinated per destination requirements",
        ],
        "order": 4,
    },
    {
        "slug": "psyllium-husk-powder-99",
        "name": "Psyllium Husk Powder 99%",
        "tier": "Prime 99 Milled",
        "purity": "99%",
        "badge": "99% Purity · Powder",
        "image": "https://images.pexels.com/photos/4055798/pexels-photo-4055798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "alt": "Psyllium husk powder 99 percent purity — psyllium husk powder supplier Arnava Exim",
        "short": "High-purity 99% psyllium husk powder, milled to buyer-specified mesh.",
        "description": "Psyllium husk powder at 99% purity, milled to mesh specifications shared by the buyer. A premium milled grade for formulations that call for high-purity psyllium powder, supplied as per confirmed specifications.",
        "points": [
            "99% purity, milled powder",
            "Mesh size as per buyer specification",
            "Custom specifications available",
        ],
        "order": 5,
    },
]


async def seed_products() -> None:
    count = await db.products.count_documents({})
    if count > 0:
        return
    now = datetime.now(timezone.utc).isoformat()
    for p in PRODUCT_SEED:
        await db.products.insert_one({**p, "created_at": now})
    logger.info("Seeded %d products", len(PRODUCT_SEED))


@api_router.get("/")
async def root():
    return {"message": "Arnava Exim API", "status": "ok"}


@api_router.post("/auth/login")
async def login(payload: LoginRequest, request: Request, response: Response):
    email = payload.email.lower().strip()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    if await is_locked(identifier):
        raise HTTPException(status_code=429, detail="Too many failed attempts. Please try again in 15 minutes.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        await register_failure(identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    set_auth_cookies(response, str(user["_id"]), email)
    return {"id": str(user["_id"]), "email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


@api_router.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    response.set_cookie(
        key="access_token",
        value=create_access_token(str(user["_id"]), user["email"]),
        httponly=True,
        secure=True,
        samesite="none",
        max_age=ACCESS_TOKEN_SECONDS,
        path="/",
    )
    return {"ok": True}


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


@api_router.post("/inquiries")
async def create_inquiry(payload: InquiryCreate):
    doc = payload.model_dump()
    doc["form_type"] = doc["form_type"] if doc["form_type"] in ("inquiry", "contact", "spec") else "inquiry"
    doc["status"] = "new"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.inquiries.insert_one(doc)
    return {"success": True, "id": str(result.inserted_id), "message": "Thank you for your inquiry. Our export team will get back to you shortly."}


@api_router.get("/inquiries")
async def list_inquiries(user: dict = Depends(get_current_user)):
    docs = await db.inquiries.find().sort("created_at", -1).to_list(500)
    return [serialize_inquiry(d) for d in docs]


@api_router.patch("/inquiries/{inquiry_id}")
async def update_inquiry_status(inquiry_id: str, payload: InquiryStatusUpdate, user: dict = Depends(get_current_user)):
    if payload.status not in ("new", "read"):
        raise HTTPException(status_code=400, detail="Invalid status")
    try:
        oid = ObjectId(inquiry_id)
    except InvalidId:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    result = await db.inquiries.update_one({"_id": oid}, {"$set": {"status": payload.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"ok": True}


@api_router.delete("/inquiries/{inquiry_id}")
async def delete_inquiry(inquiry_id: str, user: dict = Depends(get_current_user)):
    try:
        oid = ObjectId(inquiry_id)
    except InvalidId:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    result = await db.inquiries.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"ok": True}


@api_router.get("/products")
async def list_products():
    docs = await db.products.find().sort("order", 1).to_list(200)
    return [serialize_product(d) for d in docs]


@api_router.get("/products/{slug}")
async def get_product(slug: str):
    doc = await db.products.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    return serialize_product(doc)


@api_router.post("/products")
async def create_product(payload: ProductIn, user: dict = Depends(get_current_user)):
    doc = payload.model_dump()
    doc["slug"] = await unique_slug(slugify(doc.get("slug") or doc["name"]))
    doc["alt"] = doc["alt"] or f"{doc['name']} — Arnava Exim, India"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.products.insert_one(doc)
    doc["_id"] = result.inserted_id
    return serialize_product(doc)


@api_router.put("/products/{product_id}")
async def update_product(product_id: str, payload: ProductIn, user: dict = Depends(get_current_user)):
    try:
        oid = ObjectId(product_id)
    except InvalidId:
        raise HTTPException(status_code=404, detail="Product not found")
    update = payload.model_dump()
    if update.get("slug"):
        update["slug"] = slugify(update["slug"])
    else:
        update.pop("slug", None)
    if not update.get("alt"):
        update["alt"] = f"{update['name']} — Arnava Exim, India"
    result = await db.products.update_one({"_id": oid}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    doc = await db.products.find_one({"_id": oid})
    return serialize_product(doc)


@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, user: dict = Depends(get_current_user)):
    try:
        oid = ObjectId(product_id)
    except InvalidId:
        raise HTTPException(status_code=404, detail="Product not found")
    result = await db.products.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.inquiries.create_index("created_at")
    await db.products.create_index("slug", unique=True)
    await seed_admin()
    await seed_products()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
