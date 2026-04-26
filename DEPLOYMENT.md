# Deployment Guide — Laptop Refurbished

End-to-end documentation covering architecture, API connectivity, environment setup, and deployment for both backend and frontend.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Environment Variables](#4-environment-variables)
5. [Backend Setup & Deployment](#5-backend-setup--deployment)
6. [Frontend Setup & Deployment](#6-frontend-setup--deployment)
7. [How Frontend Connects to Backend API](#7-how-frontend-connects-to-backend-api)
8. [Authentication Flow](#8-authentication-flow)
9. [Complete API Reference](#9-complete-api-reference)
10. [Database Schema & Relationships](#10-database-schema--relationships)
11. [File Uploads](#11-file-uploads)
12. [Deployment Options](#12-deployment-options)
13. [Post-Deployment Checklist](#13-post-deployment-checklist)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Architecture Overview

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────┐
│                  │  HTTP   │                  │  MySQL   │              │
│   React Frontend │ ──────► │  Express Backend  │ ──────► │  MySQL DB    │
│   (Port 3000)    │  REST   │  (Port 5001)     │  ORM    │  (Port 3306) │
│                  │◄─────── │                  │◄─────── │              │
└──────────────────┘  JSON   └──────────────────┘Sequelize└──────────────┘
     Static Files              API: /api/v1/*                refurbished_laptops
     (CRA build/)              JWT Auth
                               File Uploads → frontend/public/image/products/
```

**Request flow:**
1. Browser loads React SPA from static hosting (or CRA dev server)
2. React app calls backend API at `API_BASE_URL` (default: `http://localhost:5001/api/v1`)
3. Backend processes request, queries MySQL via Sequelize ORM
4. Response returned as JSON with `{ success: true/false, data: ..., message: ... }`

---

## 2. Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express 5 | HTTP server & routing |
| Sequelize 6 + mysql2 | ORM for MySQL database |
| JWT (jsonwebtoken) | Authentication tokens |
| bcrypt / bcryptjs | Password hashing |
| Multer | File upload handling |
| Helmet | HTTP security headers |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 (CRA) | UI framework |
| React Router 7 | Client-side routing |
| Redux Toolkit | State management (cart, wishlist, auth) |
| Tailwind CSS 3 | Styling |
| js-cookie | Auth token storage |
| jwt-decode | Decoding JWT on client |
| Framer Motion | Animations |
| Lucide React / React Icons | Icons |
| Swiper | Carousels |
| Ant Design | Some UI components |
| React Toastify | Toast notifications |

### Database
| Technology | Purpose |
|-----------|---------|
| MySQL | Relational database |
| Sequelize | ORM with `sync({ alter: true })` |

---

## 3. Project Structure

```
SumitLap2/
├── backend/
│   ├── server.js                    # Express app entry point
│   ├── package.json
│   ├── .env                         # Backend environment variables
│   ├── seedData.js                  # Database seeding (npm run seed)
│   ├── seedFilterOptions.js         # Filter options seeder
│   ├── config/
│   │   └── database.js              # Sequelize MySQL connection
│   ├── middlewares/
│   │   ├── auth/
│   │   │   └── authMiddleware.js    # JWT auth + admin role check
│   │   └── errorHandler.js          # Global error handler
│   └── modules/
│       ├── auth/                    # Login & Register
│       ├── product/                 # Product CRUD + search
│       ├── users/                   # Profile, Cart, Wishlist
│       ├── orders/                  # Order management
│       ├── addresses/               # User addresses
│       ├── filterOptions/           # Brand/RAM/Storage filters
│       ├── upload/                  # Image upload (Multer)
│       ├── categories/              # Category model (DB only)
│       ├── coupons/                 # Coupon model (DB only)
│       └── reviews/                 # Review model (DB only)
│
└── frontend/
    ├── package.json
    ├── .env                         # Frontend environment variables
    ├── public/
    │   ├── index.html               # HTML shell
    │   └── image/                   # Static images + uploaded products
    ├── build/                       # Production build output (after npm run build)
    └── src/
        ├── App.js                   # Router + layout
        ├── index.js                 # React entry
        ├── api/                     # API modules (fetch wrapper)
        │   ├── index.js             # Central fetch wrapper
        │   ├── productApi.js
        │   ├── authApi.js
        │   ├── cartApi.js
        │   ├── wishlistApi.js
        │   ├── orderApi.js
        │   ├── userApi.js
        │   ├── reviewApi.js
        │   ├── couponApi.js
        │   └── filterOptionApi.js
        ├── config/
        │   └── constants.js         # API_BASE_URL, branding, keys
        ├── redux/
        │   ├── store.js
        │   ├── loginSlice.js
        │   ├── cartSlice.js
        │   └── wishlistSlice.js
        ├── pages/                   # Route-level page components
        ├── features/
        │   ├── admin/               # Admin portal pages
        │   └── products/            # Product sections (home)
        ├── Components/              # Shared UI components
        └── utils/                   # Helpers
```

---

## 4. Environment Variables

### Backend (`backend/.env`)

```env
# Database Configuration
DB_HOST=localhost              # MySQL host
DB_PORT=3306                   # MySQL port
DB_NAME=refurbished_laptops    # Database name
DB_USER=root                   # MySQL username
DB_PASSWORD=your_password      # MySQL password

# Server Configuration
PORT=5001                      # Express server port
NODE_ENV=development           # development | production

# API Configuration
API_BASE_URL=/api/v1           # API route prefix

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001   # Comma-separated allowed origins

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key    # Secret for signing JWTs
JWT_EXPIRES_IN=7d                        # NOTE: Not currently wired; hardcoded to 7d in authService.js
```

### Frontend (`frontend/.env`)

```env
# Backend API URL — this is the ONLY env var that matters for API connectivity
REACT_APP_API_BASE_URL=http://localhost:5001/api/v1
```

> **Important:** The frontend uses `REACT_APP_API_BASE_URL` (not `REACT_APP_URL`). CRA bakes env vars into the build at compile time — you must rebuild after changing them.

---

## 5. Backend Setup & Deployment

### Local Development

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Ensure MySQL is running and create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS refurbished_laptops;"

# 4. Configure .env (see section 4)

# 5. Start the server
npm start
# Server runs at http://localhost:5001
# API available at http://localhost:5001/api/v1

# 6. (Optional) Seed test data
npm run seed                       # Seeds 50 products (skips if data exists)
FORCE_SEED=true npm run seed       # Wipes and re-seeds all products
node seedFilterOptions.js          # Seeds filter dropdown options
```

### What `npm start` does:
1. Loads `.env` via `dotenv`
2. Connects to MySQL via Sequelize
3. Runs `sequelize.sync({ alter: true })` — auto-creates/alters tables to match models
4. Mounts middleware: `helmet` → `cors` → `json/urlencoded` → request logger (dev only)
5. Mounts all route modules under `API_BASE_URL` (`/api/v1`)
6. Starts Express on `PORT` (default 5001)

### NPM Scripts
| Script | Command | Purpose |
|--------|---------|---------|
| `npm start` | `node server.js` | Start the API server |
| `npm run seed` | `node seedData.js` | Seed products into DB |
| `npm test` | (not configured) | Placeholder |

### Production Deployment

```bash
# On your server:
cd backend
npm install --production
NODE_ENV=production npm start

# Or use a process manager:
npm install -g pm2
pm2 start server.js --name "laptop-api" --env production
pm2 save
pm2 startup
```

**Production `.env` changes:**
```env
NODE_ENV=production
DB_HOST=your-mysql-host.com
DB_PASSWORD=strong_production_password
JWT_SECRET=cryptographically-random-64-char-string
CORS_ORIGIN=https://yourdomain.com
PORT=5001
```

---

## 6. Frontend Setup & Deployment

### Local Development

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Configure .env
echo "REACT_APP_API_BASE_URL=http://localhost:5001/api/v1" > .env

# 4. Start dev server
npm start
# App runs at http://localhost:3000
```

### Production Build

```bash
# 1. Set the production API URL
echo "REACT_APP_API_BASE_URL=https://api.yourdomain.com/api/v1" > .env.production

# 2. Build
npm run build

# 3. Output is in build/ — serve as static files
```

### NPM Scripts
| Script | Command | Purpose |
|--------|---------|---------|
| `npm start` | `react-scripts start` | Dev server (port 3000) |
| `npm run build` | `react-scripts build` | Production build → `build/` |
| `npm run lint` | `eslint .` | Lint the codebase |

### Serving the Build

The `build/` folder contains static HTML/CSS/JS. Serve with any static file server with **SPA fallback** (all routes → `index.html`):

**Using `serve`:**
```bash
npm install -g serve
serve -s build -l 3000
```

**Using Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /image/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 7. How Frontend Connects to Backend API

### The Connection Chain

```
Frontend                          Backend
────────                          ───────
constants.js                      server.js
  └─ API_BASE_URL ─────────────►   └─ app.use(base_url, routes)
     "http://localhost:5001          "/api/v1"
      /api/v1"

api/index.js
  └─ fetch(`${API_BASE_URL}${path}`)
     e.g. fetch("http://localhost:5001/api/v1/products")

api/productApi.js
  └─ api.get("/products")  →  GET http://localhost:5001/api/v1/products
  └─ api.post("/products") →  POST http://localhost:5001/api/v1/products
```

### Step-by-step:

**1. API_BASE_URL is configured in `frontend/src/config/constants.js`:**
```js
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api/v1";
```

**2. Central fetch wrapper in `frontend/src/api/index.js`:**
```js
const connect = async (method, url, json, formData, body) => {
  const token = Cookies.get("refurbLapToken_CID_200");
  const headers = {
    Authorization: token ? `laptop_resell ${token}` : "",
    "Content-Type": "application/json",  // omitted for FormData
  };
  const response = await fetch(`${API_BASE_URL}${url}`, { method, headers, body });
  const result = await response.json();
  // checks result.success, handles 401/403, returns data
};

export const api = {
  get:      (url) => connect("GET", url, ...),
  post:     (url, body) => connect("POST", url, ..., JSON.stringify(body)),
  put:      (url, body) => connect("PUT", url, ..., JSON.stringify(body)),
  delete:   (url, body) => connect("DELETE", url, ...),
  postData: (url, formData) => connect("POST", url, ..., formData),  // file uploads
};
```

**3. Domain API modules call the wrapper:**
```js
// productApi.js
export const productApi = {
  getAll: (params) => api.get(`/products?page=${params.page}&limit=${params.limit}`),
  getById: (id)    => api.get(`/products/${id}`),
  create: (data)   => api.post("/products", data),
  update: (id, d)  => api.put(`/products/${id}`, d),
  delete: (id)     => api.delete(`/products/${id}`),
};
```

**4. Backend receives at the mounted route:**
```js
// server.js
const base_url = process.env.API_BASE_URL || "/api/v1";
app.use(base_url, productModuleRoutes);  // → handles /api/v1/products/*
```

**5. CORS allows the frontend origin:**
```js
// server.js
const allowedOrigins = process.env.CORS_ORIGIN?.split(",");
// ["http://localhost:3000", "http://localhost:3001"]
app.use(cors({ origin: ..., credentials: true }));
```

### Key Point for Deployment

The frontend `API_BASE_URL` must exactly match `<backend-host>:<port><API_BASE_URL>`:

| Environment | Frontend `REACT_APP_API_BASE_URL` | Backend `CORS_ORIGIN` |
|-------------|-----------------------------------|----------------------|
| Local Dev | `http://localhost:5001/api/v1` | `http://localhost:3000` |
| Production (same domain) | `https://yourdomain.com/api/v1` | `https://yourdomain.com` |
| Production (separate) | `https://api.yourdomain.com/api/v1` | `https://yourdomain.com` |

---

## 8. Authentication Flow

```
┌─────────┐    POST /auth/login     ┌──────────┐    verify password    ┌────────┐
│  React   │ ─────────────────────► │  Express  │ ──────────────────► │  MySQL  │
│  App     │  { email, password }   │  Backend  │   bcrypt.compare()  │  users  │
│          │◄───────────────────── │           │◄──────────────────── │         │
│          │  { token, user }       │           │   user row           │         │
└─────────┘                        └──────────┘                      └────────┘
     │                                   │
     │  Store token in cookie            │  Sign JWT with:
     │  "refurbLapToken_CID_200"         │  { user_id, email, phone,
     │  (js-cookie, 7-day expiry)        │    role, first_name, last_name }
     │                                   │  expiresIn: "7d"
     ▼
  Every subsequent API request:
  Authorization: laptop_resell <jwt_token>
```

### Backend Auth Middleware

```
authMiddleware:
  1. Read "Authorization" header
  2. Extract token after "Bearer " or "laptop_resell "
  3. jwt.verify(token, JWT_SECRET)
  4. Set req.user = decoded payload
  5. next()

adminMiddleware:
  1. Check req.user.role === "admin"
  2. If not → 403 Forbidden
```

### Frontend Auth Flow

1. User submits login form → `authApi.login({ email, password })`
2. On success: `Cookies.set("refurbLapToken_CID_200", token, { expires: 7 })`
3. Redux `loginSlice` stores user data in state
4. `App.js` on mount: reads cookie → `jwtDecode(token)` → dispatches to Redux
5. Every API call: `api/index.js` reads cookie and adds `Authorization` header
6. On 401: clears cookie, redirects to `/login`

---

## 9. Complete API Reference

Base URL: `{HOST}:{PORT}/api/v1` (default: `http://localhost:5001/api/v1`)

### Health Check
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | None | Server health (outside /api/v1) |

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | None | Register new user |
| POST | `/auth/login` | None | Login, returns JWT |

### Products (Public)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products` | None | List products (paginated, filterable) |
| GET | `/products/all` | None | All products (no pagination) |
| GET | `/products/search?q=` | None | Search products |
| GET | `/products/suggest?q=` | None | Search suggestions |
| GET | `/products/filters` | None | Available filter values |
| GET | `/products/featured?limit=` | None | Featured products |
| GET | `/products/new-arrivals?limit=` | None | New arrivals |
| GET | `/products/best-sellers?limit=` | None | Best sellers |
| GET | `/products/:product_id` | None | Single product with specs |
| GET | `/products/:product_id/related?limit=` | None | Related products |

### Products (Admin)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/products` | Admin | Create product |
| PUT | `/products/:product_id` | Admin | Update product |
| DELETE | `/products/:product_id` | Admin | Delete product |
| GET | `/products/:product_id/duplicate` | Admin | Duplicate product |

### User Profile
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users/profile` | User | Get profile |
| PUT | `/users/profile` | User | Update profile |
| POST | `/users/change-password` | User | Change password |
| DELETE | `/users/delete-account` | User | Delete account |

### Cart
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/cart` | User | Get cart items |
| POST | `/cart` | User | Add to cart |
| PUT | `/cart` | User | Update cart item |
| DELETE | `/cart` | User | Remove from cart |

### Wishlist
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/wishlist` | User | Get wishlist |
| POST | `/wishlist` | User | Add to wishlist |
| DELETE | `/wishlist` | User | Remove from wishlist |

### Orders (User)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/orders` | User | Place order |
| GET | `/orders/my-orders` | User | User's orders |
| GET | `/orders/:order_id` | User | Order details |
| POST | `/orders/:order_id/cancel` | User | Cancel order |
| GET | `/orders/track/:order_number` | None | Track order |

### Orders (Admin)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/orders` | Admin | All orders |
| PUT | `/orders/:order_id/status` | Admin | Update order status |
| PUT | `/orders/:order_id/payment` | Admin | Update payment status |
| GET | `/orders/stats/summary` | Admin | Order statistics |

### Addresses
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/addresses` | User | List addresses |
| GET | `/addresses/:id` | User | Get address |
| POST | `/addresses` | User | Add address |
| PUT | `/addresses/:id` | User | Update address |
| DELETE | `/addresses/:id` | User | Delete address |
| PATCH | `/addresses/:id/default` | User | Set default |

### Filter Options
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/filter-options` | None | All filter options |
| GET | `/filter-options/:type` | None | Options by type |
| GET | `/filter-options/:type/search?q=` | None | Search options |
| POST | `/filter-options` | Admin | Create option |
| PUT | `/filter-options/:id` | Admin | Update option |
| DELETE | `/filter-options/:id` | Admin | Soft delete |
| DELETE | `/filter-options/:id/hard` | Admin | Hard delete |

### File Upload
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/upload/images` | None | Upload images (multipart, field: `images`, max 10 files, 10MB each) |

---

## 10. Database Schema & Relationships

### Tables (auto-created by Sequelize sync)

```
product_general_info          product_detailed_specifications
├── product_id (PK, UUID)     ├── id (PK, UUID)
├── model_name                ├── product_id (FK → product_general_info)
├── model_number              ├── screen_size
├── brand_name                ├── processor_info
├── images (JSON array)       ├── os_info
├── color                     ├── display_info
├── ram                       ├── graphics_info
├── processor                 ├── wifi_bt_info
├── storage                   ├── memory_storage
├── generation                ├── camera_info
├── graphics                  ├── keyboard_info
├── in_stock (BOOLEAN)        ├── weight
├── price (INTEGER)           ├── special_feature
├── mrp (INTEGER)             └── benefits (JSON)
├── type
├── category
└── added_date

users                         orders
├── user_id (PK, UUID)        ├── order_id (PK, UUID)
├── email (unique)            ├── order_number (unique)
├── password (hashed)         ├── user_id (FK → users)
├── first_name                ├── items (JSON)
├── last_name                 ├── subtotal, discount, shipping, tax
├── role ("user"/"admin")     ├── total_amount
├── phone (unique)            ├── shipping_address (JSON)
├── wishlists (JSON array)    ├── order_status (ENUM)
├── carts (JSON array)        ├── payment_method (ENUM)
└── purchased_products (JSON) ├── payment_status (ENUM)
                              └── tracking, dates, notes...

addresses                     categories
├── address_id (PK, UUID)     ├── category_id (PK, UUID)
├── user_id (FK → users)      ├── name, slug (unique)
├── address_type (ENUM)       ├── description, image_url
├── full_name, phone          ├── parent_id (self-ref FK)
├── address_line_1, 2         └── is_active, display_order
├── city, state, pincode
└── is_default                filter_options
                              ├── id (PK, UUID)
reviews                       ├── type (ENUM: brand/processor/ram/storage)
├── review_id (PK, UUID)      ├── value
├── product_id (FK)           ├── logo_url
├── user_id (FK)              └── is_active
├── order_id (FK)
├── rating (1-5)              coupons
├── title, review_text        ├── coupon_id (PK, UUID)
└── is_verified_purchase      ├── code (unique)
                              ├── discount_type, discount_value
                              └── valid_from, valid_until, usage_limit
```

### Associations
- `GeneralProductInfo` **hasOne** `DetailedSpecifications` (via `product_id`)
- Cart & Wishlist are JSON columns on `users` table (not separate tables)
- Orders reference `user_id` but items are stored as JSON

---

## 11. File Uploads

### How It Works
- **Endpoint:** `POST /api/v1/upload/images`
- **Middleware:** Multer with disk storage
- **Accepted types:** JPEG, PNG, WebP, GIF
- **Limits:** Max 10 files, 10MB each
- **Storage path:** `frontend/public/image/products/` (relative to repo root)
- **Filenames:** UUID + original extension (e.g., `a1b2c3d4-...-.jpg`)
- **Response:** Array of URL paths like `/image/products/a1b2c3d4.jpg`

### Deployment Consideration
The upload route writes to `frontend/public/image/products/`. In production:
- If backend and frontend are on the **same server**: this path works as-is
- If they are on **different servers**: you need either:
  - A shared filesystem / NFS mount
  - Switch to cloud storage (S3, Cloudinary) and update the upload module
  - Reverse proxy to serve uploaded images from the backend

---

## 12. Deployment Options

### Option A: Single Server (Simplest)

```
Server (e.g., EC2, DigitalOcean Droplet, VPS)
├── MySQL (local or managed)
├── Node.js backend (PM2) → port 5001
├── Frontend build/ served by Nginx → port 80/443
└── Nginx reverse proxy: /api/v1 → localhost:5001
```

**Nginx config for single server:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend (React SPA)
    root /var/www/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Uploaded product images
    location /image/products/ {
        alias /var/www/frontend/build/image/products/;
        expires 30d;
    }

    # Backend API proxy
    location /api/v1/ {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 50M;
    }
}
```

**With this setup:**
```env
# Frontend .env.production
REACT_APP_API_BASE_URL=/api/v1

# Backend .env
CORS_ORIGIN=https://yourdomain.com
```

### Option B: Separate Services

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐
│  Vercel/Netlify   │     │  Railway/Render   │     │  PlanetScale │
│  Frontend         │────►│  Backend API      │────►│  / AWS RDS   │
│  (Static hosting) │     │  (Node.js)        │     │  MySQL       │
└──────────────────┘     └──────────────────┘     └──────────────┘
```

**Frontend on Vercel:**
```bash
# Build command: npm run build
# Output directory: build
# Environment variable:
REACT_APP_API_BASE_URL=https://your-api.railway.app/api/v1
```

**Backend on Railway/Render:**
```bash
# Start command: node server.js
# Environment variables: (all from section 4)
CORS_ORIGIN=https://your-frontend.vercel.app
NODE_ENV=production
```

### Option C: Docker (Advanced)

**`docker-compose.yml` (create at repo root):**
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: refurbished_laptops
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: ./backend
    ports:
      - "5001:5001"
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_NAME: refurbished_laptops
      DB_USER: root
      DB_PASSWORD: rootpassword
      PORT: 5001
      NODE_ENV: production
      JWT_SECRET: your-secret-key
      CORS_ORIGIN: http://localhost:3000
      API_BASE_URL: /api/v1
    depends_on:
      - mysql

  frontend:
    build:
      context: ./frontend
      args:
        REACT_APP_API_BASE_URL: http://localhost:5001/api/v1
    ports:
      - "3000:80"

volumes:
  mysql_data:
```

---

## 13. Post-Deployment Checklist

### Backend
- [ ] MySQL is running and accessible from the backend
- [ ] Database `refurbished_laptops` exists
- [ ] All `.env` variables are set (especially `JWT_SECRET`, `DB_PASSWORD`)
- [ ] `JWT_SECRET` is a strong, unique value (not the default)
- [ ] `CORS_ORIGIN` includes the frontend's production URL
- [ ] `NODE_ENV=production` is set
- [ ] Process manager (PM2) is configured for auto-restart
- [ ] Seed data if needed: `npm run seed`
- [ ] Upload directory is writable: `frontend/public/image/products/`
- [ ] Health check responds: `GET /health`

### Frontend
- [ ] `REACT_APP_API_BASE_URL` points to production backend
- [ ] `npm run build` completes without errors
- [ ] SPA fallback is configured (all routes → `index.html`)
- [ ] Static assets are served with cache headers
- [ ] Test: products load on `/products`
- [ ] Test: login/register works
- [ ] Test: admin portal accessible at `/admin-portal`

### Security
- [ ] HTTPS is enabled (SSL certificate)
- [ ] `.env` files are NOT committed to git
- [ ] `JWT_SECRET` is rotated from development value
- [ ] `DB_PASSWORD` is strong
- [ ] Rate limiting is considered for production
- [ ] Helmet security headers are active (`NODE_ENV=production`)

---

## 14. Troubleshooting

### "Failed to fetch" / Network Error
- Backend not running or wrong port
- `REACT_APP_API_BASE_URL` doesn't match backend address
- CORS: frontend origin not in `CORS_ORIGIN`

### "Session expired" on every request
- `JWT_SECRET` mismatch between when token was issued and current server
- Token cookie name mismatch (must be `refurbLapToken_CID_200`)
- Clock skew between client and server

### Products load but images are broken
- Images stored as local paths (`/image/laptop-1.jpg`) but files don't exist
- Seed uses Unsplash URLs — requires internet access
- Upload path `frontend/public/image/products/` doesn't exist or isn't writable

### Database sync errors on startup
- MySQL not running or wrong credentials
- `sequelize.sync({ alter: true })` can fail on certain schema changes — may need to drop and recreate tables

### Admin portal returns 403
- User's `role` field in DB must be `"admin"`
- Make admin: `UPDATE users SET role='admin' WHERE email='your@email.com';`
- Or run: `node findAdminUsers.js --create`

### CORS errors in browser console
- Ensure `CORS_ORIGIN` in backend `.env` exactly matches the frontend URL (including protocol, no trailing slash)
- Example: `http://localhost:3000` not `http://localhost:3000/`

---

## Quick Reference: Running Locally

```bash
# Terminal 1 — Backend
cd backend
npm install
npm start                    # → http://localhost:5001

# Terminal 2 — Frontend
cd frontend
npm install
npm start                    # → http://localhost:3000

# Terminal 3 — Seed data (optional)
cd backend
FORCE_SEED=true npm run seed  # 50 products across 10 categories
```

**Default URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001/api/v1
- Health Check: http://localhost:5001/health
- Admin Portal: http://localhost:3000/admin-portal (requires admin role)
