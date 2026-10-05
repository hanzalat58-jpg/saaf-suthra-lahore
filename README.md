# Saaf Suthra Lahore — Frontend + Backend

This package is an **independent website concept/demo** titled **Saaf Suthra Lahore**. It is not the official Punjab government or LWMC website and does not copy or reproduce any private government backend, database, admin panel, credentials, or internal systems.

## What was updated

- Front page redesigned to closely follow the supplied modern green/white reference design.
- Personal/profile photo removed.
- No emoji-based service or hero artwork.
- Local visual assets added under `frontend/assets/`.
- Hero automatic swiper with three slides.
- Prominent **1139 Clean Lahore Helpline** call card with phone artwork.
- Local sanitation/truck visual used in the hero and gallery.
- Professional vector icons used for service cards.
- Responsive desktop, tablet and mobile layout.
- Complaint form connected to the Node.js/Express backend.
- Browser localStorage fallback when the backend is offline.

## Folder structure

```text
saaf-suthra-lahore/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│       ├── logo.svg
│       ├── hero-lwmc.jpg
│       ├── gallery-workers.jpg
│       └── gallery-city.jpg
├── backend/
│   ├── package.json
│   └── server.js
└── README.md
```

## Run in VS Code

1. Extract the ZIP.
2. Open the `saaf-suthra-lahore` folder in VS Code.
3. Open VS Code Terminal.
4. Run:

```bash
cd backend
npm install
npm start
```

5. Open:

```text
http://localhost:4000
```

The Express server also serves the frontend, so Live Server is not required when using the backend.

## API

- `GET /api/health` — server health check
- `GET /api/complaints` — list locally stored demo complaints
- `POST /api/complaints` — submit a complaint

Submitted complaints are stored in `backend/complaints.json` after the first successful submission.

## Notes about the visual assets

The hero/truck visual is a design asset prepared for this independent concept using the supplied reference direction. Replace the JPGs in `frontend/assets/` with officially licensed/owned photography if this is later deployed as a real public-sector website.


### Logo display fix
The About-section logo card was fixed so the actual green emblem is visible instead of appearing as a blank white circle.
