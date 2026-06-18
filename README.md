# Car Rental Platform — Backend API

A production-ready REST API for a multi-role car rental platform built with Node.js, TypeScript, and PostgreSQL. The platform supports three user roles — customers, vendors, and superadmins — with full authentication, document verification, and vehicle management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express |
| Database | PostgreSQL |
| ORM | TypeORM |
| Auth | JWT (Access + Refresh Tokens) |
| File Storage | Cloudinary |
| File Upload | Multer |
| Password Hashing | bcrypt |

---

## Project Structure

```
apps/api/src/
├── config/
│   ├── database.ts          # PostgreSQL + TypeORM DataSource
│   └── cloudinary.ts        # Cloudinary configuration
├── middleware/
│   ├── auth.middleware.ts   # JWT verification + role guard
│   └── upload.middleware.ts # Multer + Cloudinary storage
├── modules/
│   ├── user/
│   │   ├── entity/          # User entity
│   │   ├── user.service.ts  # Auth + user business logic
│   │   ├── user.controller.ts
│   │   ├── user.routes.ts
│   │   └── user.types.ts
│   └── vendor-vehicle/
│       ├── entity/          # VendorVehicle entity
│       ├── vendor-vehicle.service.ts
│       ├── vendor-vehicle.controller.ts
│       ├── vendor-vehicle.routes.ts
│       └── vendor-vehicle.type.ts
├── documents/
│   ├── entity/              # Document entity
│   ├── document.service.ts
│   ├── document.controller.ts
│   ├── document.router.ts
│   └── document.types.ts
├── migrations/              # Raw SQL migration files
├── seeders/                 # Database seeders
├── scripts/
│   └── migrate.ts           # Custom migration + seeder runner
├── app.ts                   # Express app setup
└── index.ts                 # Entry point
```

---

## Modules

### User Module
- Customer, vendor, and superadmin registration
- Login with bcrypt password verification
- JWT access token (15 min) + refresh token (7 days) issuance
- Refresh token rotation
- Role-based access control via `requireRole` middleware
- Get and update authenticated user profile
- Soft user deletion

### Vendor Vehicle Module
- Vendors can create, update, and manage their vehicles
- Vehicle fields: make, model, year, type, plate number, price per day, city, transmission, fuel type, seats, and more
- Manual availability control (`available` / `unavailable`)
- Superadmin vehicle verification flow
- Image support via JSON field

### Document Module
- Customers and vendors upload identity documents (CNIC, vehicle registration)
- Files uploaded directly to Cloudinary via Multer middleware
- Documents stored with status: `pending`, `approved`, `rejected`
- Superadmin reviews and approves or rejects submissions
- Prevents duplicate active submissions of the same document type
- Allows resubmission only after rejection

---

## Authentication

The API uses a dual-token auth system:

- **Access Token** — short-lived (15 min), sent as `Bearer` token in headers
- **Refresh Token** — long-lived (7 days), used to issue new access tokens without re-login

### Role Guard
Routes are protected using `requireRole()` middleware:
```
customer   → can browse vehicles, upload documents, make bookings
vendor     → can manage their own vehicles, view their bookings
superadmin → can verify vehicles, review documents, manage all users
```

---

## API Endpoints

### Auth / Users
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/users/register` | None | Register new user |
| POST | `/api/users/login` | None | Login, receive token pair |
| POST | `/api/users/logout` | Required | Logout |
| POST | `/api/users/refresh` | None | Refresh access token |
| GET | `/api/users/me` | Required | Get own profile |
| PATCH | `/api/users/me` | Required | Update own profile |

### Vendor Vehicles
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/vendor-vehicles` | Vendor | Add a vehicle |
| GET | `/api/vendor-vehicles` | Required | List all vehicles |
| GET | `/api/vendor-vehicles/:id` | Required | Get vehicle by ID |
| PATCH | `/api/vendor-vehicles/:id` | Vendor | Update vehicle |
| DELETE | `/api/vendor-vehicles/:id` | Vendor | Delete vehicle |

### Documents
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/documents/upload` | Required | Upload a document |
| GET | `/api/documents/me` | Required | Get own documents |
| GET | `/api/documents` | Superadmin | Get all documents |
| PATCH | `/api/documents/:id/review` | Superadmin | Approve or reject document |

---

## Database Migrations & Seeders

Migrations and seeders are written in raw SQL and managed by a custom runner (`src/scripts/migrate.ts`). Executed migrations and seeders are tracked in `_migrations` and `_seeds` tables in the database, preventing duplicate runs and enabling selective rollbacks.

### Migration Commands
```bash
npm run migration:run        # Run all pending migrations
npm run migration:revert     # Revert last migration
npm run migration:revert:all # Revert all migrations
npm run migration:status     # Check migration status
```

### Seeder Commands
```bash
npm run seed:run             # Run all pending seeders
npm run seed:revert          # Revert last seeder
npm run seed:status          # Check seeder status
```

---

## Environment Variables

Create a `.env` file in `apps/api/`:

```
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Getting Started

```bash
# Install dependencies
cd apps/api
npm install

# Set up environment variables
cp .env.example .env

# Run migrations
npm run migration:run

# Seed the database
npm run seed:run

# Start development server
npm run dev
```

---

## In Progress

- Booking module (Redis hold system, availability check, Lua atomic confirmation)
- Payment module
- Booking timeout via BullMQ
- Fuel verification
- Vehicle condition reports
- Chat module
- Dispute and refund flow
