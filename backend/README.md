# Baberia Fashion — Backend

## Setup

```bash
cd backend
npm install
```

## Configure Environment
Copy `.env` and fill in your values:
- `MONGODB_URI` — your MongoDB connection string
- `JWT_SECRET` — a strong random secret
- `PORT` — default 5000

## Run

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/health | No | Health check |
| GET | /api/products | No | List products |
| GET | /api/products/:id | No | Single product |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| POST | /api/orders | No | Place order |
| GET | /api/orders | Admin | List orders |
| PUT | /api/orders/:id/status | Admin | Update order status |
| POST | /api/auth/login | No | Admin login |
| POST | /api/auth/register | No | Create admin |
| GET | /api/admin/stats | Admin | Dashboard stats |

## Create First Admin
Use the register endpoint or run this in MongoDB:
```js
db.admins.insertOne({
  name: "Admin",
  email: "admin@baberia.co.ke",
  password: "<bcrypt-hashed-password>",
  role: "superadmin",
  isActive: true
})
```
