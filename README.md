# Mohammed Abbas S — Premium Full-Stack 3D AI & ML Developer Portfolio

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

A modern, high-performance, full-stack 3D Personal Portfolio and Developer CRM engineered for **Mohammed Abbas S**, Computer Science Engineering (Artificial Intelligence & Machine Learning) student at Jain University.

---

## 🌟 Key Features

1. **Futuristic 3D Experience**:
   - **Interactive Three.js Neural Constellation**: Real-time 3D particle nodes and floating geometric crystals in the hero canvas that dynamically react and parallax with mouse movement.
   - **3D Card Perspective Tilt**: Interactive physics-based card tilt on project showcases, academic milestones, and skills with real-time specular pointer glare.
   - **Cobalt Blue Custom Cursor**: Dual-layer precision cursor with an ambient light follower that illuminates nearby interface elements.
   - **Floating Profile Frame**: Mohammed Abbas's portrait housed in an orbital 3D frame with glowing depth rings and status badges.

2. **Apple & Linear-Inspired Aesthetic**:
   - Strict palette: White (`#FFFFFF`), Light Gray (`#E5E7EB`), and Cobalt Blue (`#0047AB`).
   - Deep glassmorphism (`backdrop-filter: blur(16px)`), subtle glowing borders, and clean typography.

3. **Complete Python FastAPI Backend**:
   - RESTful API architecture with CORS middleware.
   - SQLAlchemy ORM with SQLite database (instant local development) and plug-and-play PostgreSQL support.
   - In-memory rate limiting and spam honeypot filters.
   - Auto-generated human-readable enquiry IDs (e.g. `ENQ-A82F9B`).

4. **Private Admin Dashboard (`/admin` or `#admin`)**:
   - JWT Bearer Token authenticated administrative CRM.
   - Overview analytics cards: **Total Enquiries**, **New**, **Read**, and **Replied**.
   - Real-time search by visitor name, email, subject, or enquiry ID.
   - Status filters (`All`, `New`, `Read`, `Replied`) and timestamp sorting.
   - Detailed message reader modal with complete contact info, status management, and internal notes log.
   - Secure logout.

---

## 👤 Personal Profile Information

- **Full Name**: Mohammed Abbas S
- **Degree**: B.Tech – Computer Science and Engineering (Artificial Intelligence and Machine Learning)
- **College**: Jain University, Bengaluru, Karnataka, India
- **Academic Period**: 2025 – 2029
- **Current CGPA**: 7.5 / 10.0
- **Email**: [abbas.cse36@gmail.com](mailto:abbas.cse36@gmail.com)
- **Phone**: [+91 8867055236](tel:+918867055236)
- **LinkedIn**: [mohammed-abbas-s-4754b1401](https://www.linkedin.com/in/mohammed-abbas-s-4754b1401)
- **GitHub**: [github.com/Abbas0307](https://github.com/Abbas0307)

---

## 🔐 Demo Admin Credentials (Local Development)

| Field | Value |
|---|---|
| **Admin URL** | `http://127.0.0.1:5173/#admin` (or click "Admin" on the navbar/footer) |
| **Username** | `admin` |
| **Password** | `Abbas@Demo2026!` |

---

## 📁 Project Structure

```
d:\ABBASportfolio/
│
├── frontend/                     # React 19 + TypeScript + Vite + Tailwind CSS
│   ├── public/
│   │   └── profile.jpg           # Mohammed Abbas's official profile photograph
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CustomCursor.tsx  # 3D glowing cobalt cursor & follower
│   │   │   ├── ThreeCanvas.tsx   # Three.js 3D neural constellation canvas
│   │   │   ├── CardTilt.tsx      # 3D perspective tilt & specular reflection
│   │   │   ├── Navbar.tsx        # Modern glassmorphic sticky navigation
│   │   │   ├── Footer.tsx        # System architecture and footer links
│   │   │   └── Icons.tsx         # SVG icons (GitHub, LinkedIn)
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx   # 3D floating profile frame & hero statement
│   │   │   ├── AboutSection.tsx  # 4 Academic cards & core focus areas
│   │   │   ├── SkillsSection.tsx # Categorized technical skills + customize modal
│   │   │   ├── ProjectsSection.tsx# 3D project cards with demo & repo buttons
│   │   │   ├── EducationSection.tsx# Vertical timeline with glowing nodes
│   │   │   ├── CertificationsSection.tsx# Verifiable credentials & achievements
│   │   │   ├── SocialSection.tsx # Live GitHub & LinkedIn cards
│   │   │   └── ContactSection.tsx# Functional form with FastAPI REST connection
│   │   ├── pages/
│   │   │   ├── HomePage.tsx      # Full portfolio layout
│   │   │   └── AdminPage.tsx     # Private authenticated CRM dashboard
│   │   ├── services/
│   │   │   └── api.ts            # FastAPI client & type definitions
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # Python FastAPI REST API & SQLAlchemy
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py         # Settings & environment configuration
│   │   │   └── security.py       # PBKDF2 password hashing & JWT token handling
│   │   ├── models/
│   │   │   └── enquiry.py        # SQLAlchemy Enquiry database model
│   │   ├── schemas/
│   │   │   └── enquiry.py        # Pydantic validation & response schemas
│   │   ├── routes/
│   │   │   ├── contact.py        # POST /api/contact with rate limiting & honeypot
│   │   │   └── admin.py          # Admin endpoints: login, stats, enquiries, CRUD
│   │   ├── database.py           # Database engine & SessionLocal factory
│   │   └── main.py               # Application entrypoint & CORS configuration
│   ├── requirements.txt
│   ├── .env
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## 🚀 Local Hosting Instructions

Both servers are currently hosted and running locally:
- **Frontend Portfolio & Admin**: `http://127.0.0.1:5173/`
- **Backend API & Swagger Docs**: `http://127.0.0.1:8000/docs`

### Manual Restart / Step-by-Step Setup:

#### 1. Backend Setup (FastAPI + Python 3.12)
```powershell
cd d:\ABBASportfolio\backend

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies (if needed)
pip install -r requirements.txt

# Start backend server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### 2. Frontend Setup (React + Vite)
```powershell
cd d:\ABBASportfolio\frontend

# Install dependencies
npm install

# Run in Development mode
npm run dev -- --host 127.0.0.1 --port 5173

# Or build & run Production Preview mode
npm run build
npm run preview -- --host 127.0.0.1 --port 5173
```

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service health status | No |
| `POST` | `/api/contact` | Submit visitor enquiry (stores in DB, gives `ENQ-XXXXXX`) | No (Rate-limited) |
| `POST` | `/api/admin/login` | Admin authentication (returns JWT bearer token) | No |
| `POST` | `/api/admin/logout` | Terminate session | Yes (Bearer Token) |
| `GET` | `/api/admin/stats` | Retrieve enquiry counters (Total, New, Read, Replied) | Yes (Bearer Token) |
| `GET` | `/api/admin/enquiries` | Query enquiries (search, status filter, sort) | Yes (Bearer Token) |
| `GET` | `/api/admin/enquiries/{id}` | Retrieve specific enquiry & mark as Read | Yes (Bearer Token) |
| `PATCH` | `/api/admin/enquiries/{id}` | Update status (`New`, `Read`, `Replied`) & notes | Yes (Bearer Token) |
| `DELETE` | `/api/admin/enquiries/{id}` | Permanently delete enquiry | Yes (Bearer Token) |

---

## 🔒 Security Best Practices Implemented

1. **Password Hashing**: Salted PBKDF2-HMAC-SHA256 with 100,000 iterations.
2. **Access Tokens**: Short-lived, digitally signed JWT tokens (`HS256`).
3. **Anti-Spam Honeypot**: Hidden decoy input in the contact form that catches automated spam bots.
4. **Rate Limiting**: IP-based rate limiting on the `/api/contact` endpoint.
5. **Input Sanitization**: Pydantic email syntax validation and string length enforcement.
6. **CORS Isolation**: Explicitly allowed frontend origins.
7. **Environment Secrets**: Sensitive secrets isolated in `.env`.

---

© 2026 Mohammed Abbas S. All rights reserved.
