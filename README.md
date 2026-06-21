# IIUI Hostel Feedback System

A lightweight, bilingual (English / Arabic + RTL) web app for collecting verified
student housing feedback and giving administration a live, decision-support
analytics dashboard.

Built with **Flask + SQLite** — no heavy build tooling, runs on minimal memory.
Tailwind-style design system is hand-written CSS; charts use Chart.js via CDN.

## Features

### Student flow
1. **Cover page** — attractive hero with "Get Started"
2. **Role selection** — Student / Admin
3. **Residency check** — "Are you a hostel resident?" (No → VIP module only)
4. **Verification** — Registration Number + Email must match the roster;
   all fields required; one submission per student (duplicate prevention)
5. **Survey** — 12 services rated 1–5; a score of 1–2 forces a comment
6. **Feedback** — 3 optional fields with "I'd like to comment / Nothing to add" toggle
7. **VIP housing module** — branches on Yes/No; demand + contact capture
8. **Confirmation** — thank-you, no dashboard access

### Admin dashboard (single private account)
- KPIs: total responses, avg satisfaction, VIP interest %, complaints
- Charts: bar (per service), doughnut (distribution), trend line, blocks×services heatmap
- Service health scores (0–100, green/yellow/red)
- Block analytics A–G with click-through comment drilldown
- Academic breakdown (BS/MS/PhD)
- VIP demand analytics
- Filters (block / level / satisfaction / VIP) re-compute everything
- Export: CSV, Excel, PDF (respects active filters)
- CSV roster import

## Run locally

```bash
./run.sh
# or manually:
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000

## Admin access

Default credentials (override with environment variables in production):

- Username: `admin`
- Password: `iiui2026`

```bash
export ADMIN_USERNAME=youruser
export ADMIN_PASSWORD=yourstrongpassword
export SECRET_KEY=some-random-secret
```

## Roster

Import a CSV from the dashboard. Columns (header names are flexible):

```
student_id, full_name, email, room_number, block, academic_level
```

A ready-to-use sample is in `sample_residents.csv`.

## Data model

- **residents** — reference roster used for verification
- **submissions** — one row per student (ratings 1–12, comments, feedback, VIP fields)

The database file `feedback.db` is created automatically on first run.
