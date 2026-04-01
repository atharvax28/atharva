# Attendance Tracker · FCRIT SEM VIII

## Deploy to Netlify

### Option A — Netlify Drop (fastest, no account needed)
1. Run `npm install && npm run build` locally
2. Drag the `dist/` folder to **netlify.com/drop**
3. Done — live URL in seconds

### Option B — Git + Netlify CI
1. Push this folder to a GitHub repo
2. Go to netlify.com → **Add new site → Import from Git**
3. Build settings are already in `netlify.toml`:
   - Build command: `npm run build`
   - Publish dir: `dist`
4. Deploy

---

## Run locally
```bash
npm install
npm run dev
```

## How persistence works

All data lives in **localStorage** under three keys:

| Key | Contents |
|-----|----------|
| `att_data` | Live attendance marks `{ "2026-03-23_0": "P", ... }` |
| `att_logs` | Array of up to 50 timestamped snapshots |
| `att_meta` | `{ lastSaved, version }` |

- **Auto-save**: Every toggle is written to `att_data` instantly — no data loss on refresh/reload
- **Snapshot save**: Click **SAVE** to create a timestamped log entry with an optional note
- **Restore**: Go to Logs tab → click RESTORE on any past snapshot to roll back
- **Export**: Download full attendance as JSON from the Logs tab

## Data stays in the browser
localStorage is per-browser, per-device. To use across devices, export JSON and re-import (or add Supabase sync later).
