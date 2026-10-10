<div align="center">

<img src="static/img/iiui-logo.png" alt="IIUI" height="92">

# 🏠 IIUI Hostel Feedback System

**A bilingual (English / العربية + RTL) web app for collecting verified student housing feedback — and giving administration a live, decision-support analytics dashboard.**

<p>
  <img alt="Python"   src="https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white">
  <img alt="Flask"    src="https://img.shields.io/badge/Flask-Web%20Framework-000000?logo=flask&logoColor=white">
  <img alt="SQLite"   src="https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white">
  <img alt="Chart.js" src="https://img.shields.io/badge/Chart.js-Analytics-FF6384?logo=chartdotjs&logoColor=white">
  <img alt="Railway"  src="https://img.shields.io/badge/Deploy-Railway-0B0D0E?logo=railway&logoColor=white">
  <img alt="Netlify"  src="https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white">
  <img alt="i18n"     src="https://img.shields.io/badge/i18n-EN%20%2F%20عربي-6C2BD9">
</p>

<p>
  <a href="#-live-demo">Live Demo</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-getting-started">Getting Started</a> ·
  <a href="#-deployment">Deployment</a> ·
  <a href="#-author">Author</a>
</p>

</div>

---

## 📖 Overview

The **IIUI Hostel Feedback System** lets hostel residents rate campus housing
services in their own language and leave detailed comments, while giving the
administration a real-time analytics dashboard to turn that feedback into
action. It is built to be **lightweight, fully bilingual, and duplicate-proof**,
with a clean, modern interface that works on phones and desktops alike.

A student opens one link — no account, no setup — rates **15 hostel services**,
and submits once. Behind a private login, the administration sees live KPIs,
charts, service health scores, and per-block breakdowns, and can export
everything to CSV, Excel, or PDF.

---

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [The 15 Rated Services](#-the-15-rated-services)
- [Student Flow](#-student-flow)
- [Admin Dashboard](#-admin-dashboard)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Data Model](#-data-model)
- [Project Structure](#-project-structure)
- [Author](#-author)
- [License](#-license)

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🌍 **Live Website** | **https://hostel-feedback.netlify.app** |
| 📋 **Student Survey** | https://hostel-feedback.netlify.app |
| 🔐 **Admin Dashboard** | https://hostel-feedback.netlify.app/admin |

> Students simply open the survey link — no sign-up required. One response per student.

---

## ✨ Features

- 🎨 **Modern, professional UI** — glassmorphism hero, gradient cards, and smooth animations
- 😀 **Creative emoji rating scale** (😞 😕 😐 😊 😄) shown above every service
- 🌍 **Fully bilingual** — English & Arabic with automatic right-to-left (RTL) layout
- ✅ **Smart student verification** — validates the IIUI Registration Number format, no roster required
- 🚫 **Duplicate-proof** — one submission per registration number
- 📊 **Live analytics dashboard** — KPIs, charts, heatmaps, and service health scores
- 🧩 **Block & academic-level breakdowns** — drill into comments per hostel block
- 📥 **Export anywhere** — CSV, Excel, and PDF reports that respect active filters
- ⚡ **Lightweight & portable** — runs on Flask + SQLite, or serverless on Netlify + Supabase

---

## 🧾 The 15 Rated Services

Each service is rated **1–5**; a low score (1–2) prompts the student for a short
explanatory comment so the feedback is actionable.

| # | Service | # | Service |
|---|---------|---|---------|
| 1 | Cleanliness | 9 | Hostel Staff |
| 2 | Maintenance | 10 | Medical Center |
| 3 | WiFi / Internet | 11 | Gym Facilities |
| 4 | Security | 12 | Tuckshop |
| 5 | Food Quality | 13 | Transport Facilities |
| 6 | Dining Staff Behaviour | 14 | Overall Experience |
| 7 | Dining Cleanliness | 15 | Assistant Resident House Tutor (ARHT) |
| 8 | Building Supervisor | | |

---

## 🧑‍🎓 Student Flow

1. **Cover page** — a glassmorphism hero with a *Get Started* call-to-action
2. **Role selection** — Student / Admin
3. **Information & verification** — Registration Number + university email
   - Accepts IIUI formats using `/` **or** `-` separators, e.g. `002136/MSDS/S24` or `4001-FBAS`
   - One submission per student (duplicate prevention)
4. **Survey** — all **15 services** rated 1–5; a score of 1–2 requires a short comment
5. **Open feedback** — optional fields for main issues, suggestions, and extra comments
6. **Confirmation** — a thank-you screen (students never see the dashboard)

---

## 📊 Admin Dashboard

*A single, private administration account — no public sign-up.*

- **KPIs** — total responses, average satisfaction, and complaints flagged
- **Charts** — per-service bars, a satisfaction doughnut, a trend line, and a block × service heatmap
- **Service health scores** — 0–100, color-coded green / yellow / red
- **Block analytics (A–G)** — with click-through comment drill-down
- **Academic breakdown** — Bachelor's / Master's / PhD
- **Live filters** — block, level, and satisfaction instantly re-compute every metric
- **Exports** — CSV, Excel, and PDF (all respect the active filters)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Flask (Python) · or Netlify serverless functions (Node.js) |
| Database | SQLite (local/Railway) · or Supabase (PostgreSQL) |
| Frontend | Hand-written CSS design system + vanilla JavaScript |
| Charts | Chart.js (via CDN) |
| i18n | Custom bilingual EN/AR engine with RTL support |
| Server | Gunicorn |
| Hosting | Railway (persistent volume) · or Netlify |

---

## 🚀 Getting Started

Run the Flask app locally in a few commands:

```bash
# 1. Clone the repository
git clone https://github.com/roqaya-k7an/Hostel-Feedback.git
cd Hostel-Feedback

# 2. Create a virtual environment and install dependencies
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# 3. Run the app
python app.py
```

Then open **<http://localhost:5000>** in your browser.
The SQLite database is created automatically on first run.

---

## ☁️ Deployment

The project can be deployed two ways — pick whichever suits you.

### Option A — Railway (Flask + SQLite)

- The **`Procfile`** starts the app with Gunicorn: `web: gunicorn app:app --bind 0.0.0.0:$PORT`
- A **persistent volume** is mounted at `/data` so the SQLite database survives restarts
- Configuration is supplied through environment variables:

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_PATH` | Where the SQLite file lives (on the volume) | `/data/feedback.db` |
| `SECRET_KEY` | Flask session security | *(long random string)* |
| `ADMIN_USERNAME` | Dashboard login | `admin` |
| `ADMIN_PASSWORD` | Dashboard password | *(a strong password)* |

### Option B — Netlify (serverless + Supabase)

A serverless build of the app runs the frontend as static pages and the API as
Netlify Functions, storing data in **Supabase (PostgreSQL)** with Row Level
Security enabled — the database is only ever reached server-side. Full
step-by-step instructions are in **[`DEPLOY_NETLIFY.md`](DEPLOY_NETLIFY.md)**.

---

## 🗃️ Data Model

| Table | Purpose |
|-------|---------|
| **residents** | Optional reference roster used to strengthen verification |
| **submissions** | One row per student — 15 service ratings + comments, plus open feedback |

The schema for the hosted (PostgreSQL) build lives in **`db/schema.sql`**; the
Flask build creates its SQLite tables automatically on first run.

---

## 📁 Project Structure

```
.
├── app.py              # Flask routes & API
├── config.py           # Settings, the 15 service categories, verification patterns
├── database.py         # SQLite data layer
├── analytics.py        # Dashboard metrics computation
├── requirements.txt    # Python dependencies
├── Procfile            # Railway / Gunicorn start command
├── sample_residents.csv
├── templates/          # Jinja2 HTML (cover, role, student, admin…)
└── static/
    ├── css/style.css   # Design system
    ├── img/            # Logo & imagery
    └── js/             # i18n.js, student.js, dashboard.js
```

---

## 👩‍💻 Author

**Roqaya** — Designer & Developer of the IIUI Hostel Feedback System.

[![GitHub](https://img.shields.io/badge/GitHub-roqaya--k7an-181717?logo=github&logoColor=white)](https://github.com/roqaya-k7an)

> Designed and built end-to-end: bilingual UI/UX, Flask & serverless backends,
> the analytics dashboard, and the deployment pipeline.

---

## 📄 License

This project was created for **International Islamic University Islamabad (IIUI)**
hostel administration. All rights reserved by the author unless stated otherwise.

---

<div align="center"><em>Built to give students a voice — and administration the insight to act. 💜</em></div>
