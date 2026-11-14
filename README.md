# Abhishekh Healthcare Consultancy - Consultation Enquiry & Admin Portal

Full-stack healthcare consultancy web platform with a modular **React 18 + Vite + Tailwind CSS** frontend, **Supabase Authentication** for secure administrative access, and a robust **FastAPI + Supabase PostgreSQL** backend for consultation enquiry management.

---

## 🚀 Quick Start Guide

### 1. Start the Backend API (FastAPI)
Open a terminal in the project root:
```bash
# Activate Python virtual environment (Windows)
backend\venv\Scripts\activate

# Run the FastAPI server
python backend\run.py
```
Or via npm:
```bash
npm run backend:dev
```
- **Backend API URL**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`

---

### 2. Start the Frontend Application (Vite + React)
Open a second terminal:
```bash
# Install frontend dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```
- **Frontend URL**: `http://localhost:3000`
- **Public Landing Page**: `http://localhost:3000/`
- **Admin Login Portal**: `http://localhost:3000/admin/login`
- **Protected Admin Area**: `http://localhost:3000/admin`
- Requests to `/api/*` are automatically proxied to `http://localhost:8000` via Vite.

---

## 🔐 Administrative Authentication Setup (Supabase Auth)

The administration system uses official **Supabase Auth** with strict access controls:
- **No Public Self-Registration**: Registration is deliberately disabled on the frontend.
- **Admin Provisioning**: Administrative accounts must be created in the Supabase Dashboard:
  1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
  2. Select **Authentication** → **Users**.
  3. Click **"Add User"** → **"Create User"**.
  4. Enter the administrator's official email and strong password.
  5. Check **"Auto Confirm User"** and save.
- **Frontend Configuration**:
  Copy `.env.example` to `.env` in the project root:
  ```ini
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
  ```
- **Protected Routes**:
  - Direct visits to `/admin` without an active session automatically redirect to `/admin/login`.
  - Sessions are securely persisted across page refreshes.
  - Clicking **"Logout"** terminates the Supabase session and returns to the login screen.
  - **"Forgot Password?"** link sends a password reset email via Supabase.

---

## 🗄️ Supabase PostgreSQL Setup (Enquiries)

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
2. Open the **SQL Editor** in your Supabase project.
3. Copy and run the entire SQL script from [`backend/schema.sql`](file:///c:/Users/Varun/Desktop/Abhishekh_Health_care_consultancy/backend/schema.sql).
   This script creates:
   - The `public.enquiries` table with constraints & indexes.
   - Row Level Security (RLS) policies allowing public submissions while restricting read/update/delete strictly to the backend `service_role`.
4. Copy your project credentials from **Project Settings → API**:
   - Project URL (`https://xyz.supabase.co`)
   - `service_role` secret key
5. Paste them into `backend/.env`:
   ```ini
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-secret-key
   ```
*(Note: If Supabase credentials are not set yet, the backend automatically operates in safe local development fallback mode with zero crashes).*

---

## 📡 API Endpoint Reference

### `POST /api/enquiries`
Submits a client consultation enquiry.

#### Request Body
```json
{
  "full_name": "Dr. Ramesh Patel",
  "phone": "+91 96633 22617",
  "email": "ramesh@metrohealth.in",
  "advisory_interest": "Clinical Operations Optimization",
  "requirements": "Inpatient flow optimization and capacity expansion planning."
}
```

#### Field Specifications & Validation
| Field | Type | Required | Rules & Validation |
| :--- | :--- | :--- | :--- |
| `full_name` | String | **Yes** | 2–100 characters; HTML stripped; alphabetic check |
| `phone` | String | **Yes** | 7–25 characters; Indian 10-digit mobile or international format |
| `email` | String | **Yes** | 5–150 characters; standard valid email format |
| `advisory_interest` | String | **Yes** | 10-100 characters |
| `requirements` | String | No | Up to 2,000 characters; HTML stripped |

#### Successful Response (`201 Created`)
```json
{
  "id": "7b09bf93-6c84-482a-a92c-623277e9d7f0",
  "reference_code": "ENQ-7B09BF93",
  "full_name": "Dr. Ramesh Patel",
  "phone": "+91 96633 22617",
  "email": "ramesh@metrohealth.in",
  "advisory_interest": "Clinical Operations Optimization",
  "status": "new",
  "created_at": "2026-11-15T00:50:00.000Z",
  "message": "Your consultation enquiry has been successfully registered. Our advisory desk will reach out shortly."
}
```

---

## 🔒 Security Architecture
- **No Database Exposure**: Supabase service keys and database credentials exist strictly on the FastAPI server; they are never exposed to the client bundle.
- **Frontend Anon Key Only**: The React frontend uses only `VITE_SUPABASE_ANON_KEY`, strictly adhering to Supabase public RLS boundaries.
- **Authentication Protected Routes**: `ProtectedRoute.tsx` verifies auth state prior to rendering `/admin`. Unauthorized attempts are redirected to `/admin/login`.
- **Row Level Security (RLS)**: Enforced directly inside PostgreSQL so anonymous users cannot read or extract enquiry data.
- **Input Sanitization**: All user text inputs are stripped of HTML/script injection tags before database insertion.
- **Spam Mitigation**: In-memory sliding window rate limiter throttles repetitive automated submissions per client IP.
- **Environment Protection**: `.env` is excluded in `.gitignore`; only `.env.example` templates are tracked.
