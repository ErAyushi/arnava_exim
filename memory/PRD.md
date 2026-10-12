# Arnava Exim — B2B Import-Export Platform PRD

## Problem Statement
Build a modern, professional, premium B2B import-export company website for **Arnava Exim**, an India-based export company located in Ahmedabad, Gujarat, India. The company specializes in psyllium husk and related psyllium products for international B2B buyers (importers, distributors, wholesalers, manufacturers) across Europe, Middle East, Asia and global markets.

## Company Information (Verified & Disclosed Only)
- **Company Name**: Arnava Exim
- **Location**: Ahmedabad, Gujarat, India
- **Business**: Import & Export / International Trading
- **Primary Product**: Psyllium Husk and Psyllium Husk Products
- **Website**: www.arnavaexim.com
- **Email**: Sales@arnavaexim.com
- **IEC**: PLHPS3426M
- **MSME**: Registered with MSME
- **Rule**: Zero false claims. No invented factories, certifications, or statistics.

## Architecture
- **Frontend**: React 19, React Router v7 (clean URLs), Tailwind CSS, Framer Motion, Lenis smooth scroll, D3 Geo + Topojson for interactive global export map, Sonner toasts.
- **Backend**: FastAPI (server.py), Uvicorn, Motor async MongoDB, PyJWT + bcrypt authentication, brute-force login protection.
- **Database**: MongoDB (collections: `users`, `inquiries`, `login_attempts`).
- **Deployment**: Supervisor-managed on Emergent platform (Frontend on 3000, Backend on 8001).

## Implemented Pages & Features (October 2026)
1. **Home (`/`)**:
   - Large kinetic hero with masked line-by-line reveal: "Connecting Quality Products with Global Markets"
   - Trust strip: India-based Exporter | B2B Supply | International Trade | Quality-Focused Sourcing
   - Slow editorial marquee with brand commitments
   - B2B capability bento grid (About preview, IEC PLHPS3426M, MSME badge, Gujarat hub)
   - Featured products catalogue preview (5 Psyllium variants)
   - 6-step quality assurance strip
   - Interactive Global Markets map (India / Ahmedabad hub highlighted with illustrative shipping arcs)
   - Why Arnava Exim (6 value pillars)
   - B2B inquiry form
2. **About Us (`/about`)**:
   - Company origin & export focus in Ahmedabad, Gujarat
   - IEC and MSME credentials display
   - 6 core export disciplines
3. **Products Catalogue (`/products`)**:
   - Category filter tabs (All Products / Psyllium Husk / Psyllium Husk Powder / Moringa Powder) with animated grid re-flow and per-category counts
   - Product families: Psyllium Husk, Psyllium Husk Powder, Moringa Powder (categories editable per product in admin)
   - 5 Psyllium variants (Psyllium Husk, Psyllium Husk Powder, Psyllium Husk 95%, Psyllium Husk 99%, Psyllium Husk Powder 99%)
   - Purity badges, descriptions, "Request Specification" and "Send Inquiry" buttons
   - Prominent notice on buyer-specific specifications
4. **Product Details (`/products/:slug`)**:
   - Product imagery, detailed descriptions, buyer requirement bullet points
   - Technical specification sheet table (Origin: India, Purity, Mesh, Moisture, Ash, Packaging, etc.)
   - Pre-filled inquiry and spec sheet request CTAs
5. **Quality & Sourcing (`/quality-sourcing`)**:
   - 6-step buyer-first vertical timeline (Buyer Requirement → Product Sourcing → Specification Confirmation → Quality / Documentation Review → Packaging & Shipment Coordination → International Delivery)
   - Laboratory testing and quality inspection photography
   - Transparent documentation availability policy
6. **Export Process (`/export-process`)**:
   - 6-step visual export flow (Inquiry → Confirmation → Quotation → Samples → Order → Shipment)
7. **Contact (`/contact`)**:
   - 11-field B2B inquiry form (Full Name, Company, Business Email, WhatsApp, Country, Product, Purity, Quantity, Port, Incoterm, Message)
   - Direct email, WhatsApp placeholder CTA, Ahmedabad location
   - Embedded Google Maps Ahmedabad placeholder
8. **Admin Dashboard (`/admin/login` & `/admin`)**:
   - JWT-authenticated admin portal for sales team
   - View, filter (All / New / Read), mark status, and delete buyer inquiries
9. **Admin Product Manager (`/admin` → Products tab)**: add, edit, delete catalogue products (name, URL slug, tier, purity badge, image URL, SEO alt text, descriptions, key bullet points, sort order) — the storefront catalogue, home preview and product detail pages update instantly from MongoDB. 5 psyllium products seeded on startup when the collection is empty.
10. **Global Elements**:
   - Sticky single-bar navigation with mobile slide-out menu
   - Footer with company credentials, quick links, and copyright
   - WhatsApp floating button & Lenis-powered back-to-top button
   - Full OpenGraph, meta titles and descriptions optimized for B2B keywords

## Prioritized Backlog
- [ ] Connect production email provider (e.g. Resend) for real-time sales inbox alerts on new inquiries
- [ ] Multi-lingual support (Arabic, German, Spanish, French) for non-English B2B buyers
- [ ] Downloadable PDF product specification sheets for offline procurement review
