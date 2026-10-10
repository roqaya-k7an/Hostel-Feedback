<div align="center">

<img src="static/img/iiui-logo.png" alt="IIUI" height="92">

# 🏠 IIUI Hostel Feedback System

**A bilingual (English / العربية + RTL) web app for collecting verified student housing feedback — and giving administration a live, decision-support analytics dashboard.**

<p>
  <img alt="Netlify"    src="https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify&logoColor=white">
  <img alt="Supabase"   src="https://img.shields.io/badge/Database-Supabase-3FCF8E?logo=supabase&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/Serverless-Functions-F7DF1E?logo=javascript&logoColor=black">
  <img alt="Chart.js"   src="https://img.shields.io/badge/Chart.js-Analytics-FF6384?logo=chartdotjs&logoColor=white">
  <img alt="HTML5"      src="https://img.shields.io/badge/Frontend-HTML5%20%2F%20CSS3-E34F26?logo=html5&logoColor=white">
  <img alt="i18n"       src="https://img.shields.io/badge/i18n-EN%20%2F%20عربي-6C2BD9">
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
charts, service health scores, and per-block breakdowns, and can export the
data to CSV.

The app is deployed on **Netlify**, with a static frontend, a **serverless
API** (Netlify Functions), and a **Supabase (PostgreSQL)** database.

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
- 📥 **CSV export** — download all responses (respects the active filters)
- ⚡ **Serverless & scalable** — static frontend + Netlify Functions + Supabase, no server to manage

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
- **CSV export** — download the filtered responses in one click

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Hosting | **Netlify** |
| Backend | **Netlify Functions** (serverless, Node.js) |
| Database | **Supabase** (PostgreSQL, with Row Level Security) |
| Frontend | Static HTML + hand-written CSS design system + vanilla JavaScript |
| Charts | Chart.js (via CDN) |
| i18n | Custom bilingual EN / AR engine with RTL support |

---

## 🚀 Getting Started

Run the project locally with the [Netlify CLI](https://docs.netlify.com/cli/get-started/):

```bash
# 1. Clone the repository
git clone https://github.com/roqaya-k7an/Hostel-Feedback.git
cd Hostel-Feedback

# 2. Install dependencies
npm install

# 3. Create a Supabase project and run db/schema.sql in the SQL Editor,
#    then add your keys to a .env file (see the variables below)

# 4. Start the local dev server
netlify dev
```

Required environment variables:

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase **service_role** key (server-side only) |
| `SECRET_KEY` | Session security (any long random string) |
| `ADMIN_USERNAME` | Admin dashboard login |
| `ADMIN_PASSWORD` | Admin dashboard password |

---

## ☁️ Deployment

The app is deployed on **Netlify** with a **Supabase** database.

1. **Create the database** — in Supabase, run [`db/schema.sql`](db/schema.sql)
   to create the `residents` and `submissions` tables (Row Level Security on).
2. **Import the repo into Netlify** — Netlify reads [`netlify.toml`](netlify.toml),
   so the publish directory (`site`) and functions directory
   (`netlify/functions`) are configured automatically.
3. **Add the environment variables** listed above in
   *Site settings → Environment variables*.
4. **Deploy.**

> 📘 Full step-by-step instructions are in **[`DEPLOY_NETLIFY.md`](DEPLOY_NETLIFY.md)**.
> The `service_role` key is used **only inside the serverless functions**, never
> exposed to the browser.

---

## 🗃️ Data Model

| Table | Purpose |
|-------|---------|
| **residents** | Optional reference roster used to strengthen verification |
| **submissions** | One row per student — 15 service ratings + comments, plus open feedback |

The full PostgreSQL schema lives in **[`db/schema.sql`](db/schema.sql)**.

---

## 📁 Project Structure

```
.
├── site/                       # Static frontend (served by Netlify)
│   ├── index.html              # Cover page
│   ├── start.html              # Role selection
│   ├── student.html            # Survey flow
│   ├── admin.html              # Admin login
│   ├── admin/dashboard.html    # Analytics dashboard
│   └── static/
│       ├── css/style.css       # Design system
│       ├── img/                # Logo & imagery
│       └── js/                 # i18n.js, student.js, dashboard.js
├── netlify/functions/          # Serverless API (Node.js + Supabase)
│   ├── verify.js   submit.js
│   ├── analytics.js  block.js  submissions.js  export.js
│   └── admin-login.js  admin-logout.js  submission-delete.js
├── db/
│   ├── schema.sql              # Supabase (PostgreSQL) schema
│   └── migration_add_rating_15.sql
├── netlify.toml                # Netlify build & API redirects
└── DEPLOY_NETLIFY.md           # Deployment guide
```

---

## 👩‍💻 Author

**Roqaya** — Designer & Developer of the IIUI Hostel Feedback System.

[![GitHub](https://img.shields.io/badge/GitHub-roqaya--k7an-181717?logo=github&logoColor=white)](https://github.com/roqaya-k7an)

> Designed and built end-to-end: bilingual UI/UX, the serverless API,
> the Supabase database, the analytics dashboard, and the Netlify deployment.

---

## 📄 License

This project was created for **International Islamic University Islamabad (IIUI)**
hostel administration. All rights reserved by the author unless stated otherwise.

---

<div align="center"><em>Built to give students a voice — and administration the insight to act. 💜</em></div>
