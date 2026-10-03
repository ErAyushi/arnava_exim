# Auth Testing Playbook

Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`, unique index on users.email, index on login_attempts.identifier.

Step 2: API Testing
```
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -c cookies.txt -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@arnavaexim.com","password":"ArnavaAdmin@2026"}'
cat cookies.txt
curl -b cookies.txt $API/api/auth/me
curl -b cookies.txt $API/api/inquiries
```
Login returns the user object and sets access_token + refresh_token cookies. /me returns the same user using those cookies. /inquiries returns the stored inquiry list. Without cookies, /me and /inquiries must return 401.

Step 3: Brute force
5 failed logins against the same email locks the account for 15 minutes (HTTP 429).
