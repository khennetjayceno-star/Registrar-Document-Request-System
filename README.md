# Registrar-Document-Request-System 🎓
A two-portal web application for the **University of Bohol Registrar's Office** 🏛️ that digitizes requesting, paying for, tracking, and claiming academic documents (TOR, diplomas, certificates, etc.) — built as two standalone, single-file HTML apps backed by a shared Supabase database.

### 📝 Description
Students log in (email-only, no password) to request documents, upload proof of payment and authorization letters, and receive a QR-coded claim stub 🎫. Registrar staff use a separate admin app to manage the document catalog, review/approve requests, scan QR codes 📷 (camera or uploaded image) to verify claimants, update request status, and manage admin accounts — all backed by the same Supabase Postgres tables.

### ✨ Features

**🧑‍🎓 Student Portal** (`ub_registrar_student.html`)
- 📧 Email-based login (auto-registers new users in `registrar_users`)
- 🗂️ Multi-step request form: personal info, multi-select Academic Year(s) and Document(s) dropdowns with live price totals (₱)
- 🖋️ Optional "Authorized Representative" upload (for someone claiming on the student's behalf)
- 🧾 Proof-of-payment upload (image/PDF, converted to base64)
- 🪟 Auto-calculated claim window/pickup location per document type, due date (+5 days), and total fee
- 📲 Generates a QR code (qrcodejs) + printable claim stub on submission
- 📜 "My Requests" / full history table with status badges and re-viewable QR codes
- ✉️ EmailJS integration (configured for confirmation emails)

**🛠️ Admin Portal** (`ub_registrar_admin.html`)
- 🔐 Username/password admin login (against `admins` table)
- 📊 Dashboard with request counts by status
- 📋 Request management table: filter/search, view full details, update status, mark as "Claimed" ✅, delete 🗑️
- 📷 QR scanner using device camera (jsQR) or uploaded image, plus manual Request ID lookup — pulls up the claim stub for verification
- 💰 Document catalog management (add/edit prices, claim windows)
- 👥 Admin user management (add admins, reset passwords)
- 🗄️ "Claimed" archive view with bulk-clear option

### ⚙️ Tech Stack
- **Frontend:** Vanilla HTML/CSS/JS 🍦 (no framework, no build step) — single self-contained files
- **Fonts:** Google Fonts (Cinzel, Rajdhani, Barlow) 🔤
- **Backend/DB:** Supabase 🐘 (Postgres + JS client `@supabase/supabase-js@2`) — used directly from the browser
- **QR generation:** `qrcodejs` 🔳
- **QR scanning:** `jsQR` 🔍
- **Email notifications:** EmailJS (`@emailjs/browser`) 📨
- **Hosting model:** Static files — can be served from any web host 🌐, no server-side code

### 👥 Team / Roles Modeled
- 🧑‍🎓 **Student/Requester** — submits and tracks document requests
- 🧑‍💼 **Registrar Staff/Admin** — processes requests, verifies and releases documents
- ⚠️ (No "super admin" tier modeled — all admin accounts have equal access)

### 📁 Project Structure
```
/ (root)
├── ub_registrar_student.html   # 🧑‍🎓 Student portal (login, request form, history, QR stub)
├── ub_registrar_admin.html     # 🛠️ Admin portal (dashboard, requests, scanner, catalog, admins)
└── UB_LOGO.jpg                 # 🖼️ Expected in same folder — falls back silently if missing
```
Both files connect to the same Supabase project and share these tables:
- `registrar_users` — 🧑‍🎓 student email records
- `registrar_requests` — 📦 all document requests, status, QR/stub payload, file uploads (base64)
- `admins` — 🔑 admin usernames and passwords

### 🚀 Setup
1. 🗄️ Create a Supabase project + the three tables above (matching fields like `req_id`, `email`, `status`, `qr_data`, `total_amount`, etc.)
2. 🔧 Replace `SUPABASE_URL` and `SUPABASE_KEY` in both files
3. ✉️ (Optional) Set up EmailJS — replace `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`
4. 🌱 Seed at least one row in `admins` for staff login
5. 🖼️ Place `UB_LOGO.jpg` next to both HTML files
6. 🌐 Serve from any static host (camera QR scanning needs HTTPS or `localhost`)

### 🔒 Security Notes — Fix Before Production
- 🚨 **Hardcoded Supabase anon key** in client source — must pair with Row Level Security (RLS); without it, anyone can read/write all three tables
- 🆔 **No real student auth** — email field alone, no OTP/magic-link verification, so anyone can impersonate any student
- 🔓 **Plaintext admin passwords** — `password_hash` is compared/stored as plain text, not actually hashed; needs bcrypt/Argon2 or Supabase Auth
- 🛡️ **No server-side authorization** — anyone with the embedded anon key could call update/delete directly unless RLS is locked down
- 📦 **Sensitive files in DB as base64** — payment proofs/auth letters bloat rows; should use Supabase Storage with signed URLs
- 🐢 **No rate limiting / CAPTCHA** on login or submission — open to spam/abuse
- 👀 **QR payload contains PII** (name, documents, totals) in plaintext, readable by anyone who scans the printed stub

**✅ Recommended fixes:** migrate to Supabase Auth (OTP for students, hashed credentials for admins), enforce RLS scoped to `auth.uid()`, move uploads to Supabase Storage, and never rely on the client-side key alone for access control.
