# Baberia Fashion — Frontend

## Setup

```bash
cd frontend
npm install
```

## Run

```bash
# Development (proxies /api to backend on port 5000)
npm run dev

# Build for production
npm run build
```

## Notes
- Runs on http://localhost:5173
- All `/api` calls are proxied to `http://localhost:5000` (backend)
- Make sure the backend is running before starting the frontend
- Products are loaded from `src/data/products.ts` (static data, no backend needed for browsing)
- Backend is only needed for: admin login, placing orders, admin dashboard stats
