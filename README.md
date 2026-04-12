<div align="center">

# 🌽 MillPro Enterprise

### The Complete Management System for Modern Milling Companies

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech)
[![License](https://img.shields.io/badge/License-MIT-BF8C1A?style=flat-square)](LICENSE)

**Track production. Manage payroll. Record sales. Gain financial clarity.**  
Purpose-built for grain and maize milling companies across East Africa.

[Live Demo](http://178.128.206.214) · [Report a Bug](https://github.com/Brianmatovu511/millpro/issues) · [Request a Feature](https://github.com/Brianmatovu511/millpro/issues)

</div>

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🏭 **Production Tracking** | Log batches — maize in, flour out, bran yield, waste per shift |
| 👥 **Payroll Management** | Auto-calculate wages by task (per unit / hour / shift), track payments |
| 📦 **Inventory Control** | Real-time flour, bran & raw maize stock with low-stock alerts |
| 💰 **Financial Reports** | 6-month revenue trends, cost breakdowns, profit & expense analytics |
| 📋 **Orders & Sales** | Customer orders from pending → dispatch, itemised sales receipts |
| 🏷️ **Customer CRM** | Named customer records linked to sales and order history |
| 🔒 **Role-based Access** | Owner / Admin / Supervisor with approval workflows |
| ✅ **Approval Queue** | Admin edits & deletes require owner approval before executing |
| 📤 **CSV & Print Export** | Export any table — work logs, finance, payroll, sales, inventory |
| 🏢 **Company Codes** | Private login — companies identified by unique 6-char code |
| 📊 **Audit Log** | Full trail of every action taken in the system |

---

## 🖥️ Tech Stack

**Backend**
- [Node.js](https://nodejs.org) + [Express](https://expressjs.com) — REST API
- [Prisma ORM](https://prisma.io) — type-safe database access
- [PostgreSQL](https://neon.tech) — serverless Neon database
- [JWT](https://jwt.io) — stateless authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — password hashing

**Frontend**
- [React 18](https://reactjs.org) — single-page application
- [Vite](https://vitejs.dev) — lightning-fast build tool
- [Axios](https://axios-http.com) — HTTP client
- Zero external UI libraries — fully custom components

**Infrastructure**
- [PM2](https://pm2.keymetrics.io) — process management & auto-restart
- [Nginx](https://nginx.org) — reverse proxy + static file serving
- [DigitalOcean](https://digitalocean.com) Droplet — Ubuntu 22.04

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)

### 1. Clone & Install
```bash
git clone https://github.com/Brianmatovu511/millpro.git
cd millpro
npm run setup        # installs all deps + generates Prisma client
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your DATABASE_URL and a strong JWT_SECRET
```

### 3. Set Up Database
```bash
npm run db:push      # push schema to your database
npm run db:seed      # load demo data (company code: JGM001)
```

### 4. Run in Development
```bash
npm run dev          # starts both server (port 5000) and client (port 5173)
```

Open [http://localhost:5173](http://localhost:5173) and sign in with code `JGM001`.

---

## 🏗️ Project Structure

```
millpro/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx          # All pages & components (single-file architecture)
│   │   ├── api.js           # Axios API client & all endpoint definitions
│   │   └── hooks/
│   │       └── useAuth.js   # Auth context & JWT management
│   └── index.html
├── server/                  # Express backend
│   ├── index.js             # App entry point & route mounting
│   ├── db.js                # Prisma client singleton
│   ├── middleware/
│   │   └── auth.js          # JWT authenticate + role authorize
│   ├── routes/              # One file per resource
│   │   ├── auth.js          # Login, register, company lookup
│   │   ├── employees.js
│   │   ├── workLogs.js
│   │   ├── payments.js
│   │   ├── batches.js
│   │   ├── sales.js
│   │   ├── orders.js
│   │   ├── purchases.js
│   │   ├── expenses.js
│   │   ├── customers.js
│   │   ├── taskTypes.js
│   │   ├── inventory.js
│   │   ├── finance.js
│   │   ├── dashboard.js
│   │   ├── reports.js
│   │   ├── pending.js       # Approval queue
│   │   ├── audit.js
│   │   └── backup.js
│   └── utils/
│       ├── audit.js         # Audit log helper
│       └── pending.js       # Pending action helper
└── prisma/
    ├── schema.prisma        # Full database schema
    └── seed.js              # Demo data seeder
```

---

## 👤 User Roles

| Role | Permissions |
|------|-------------|
| **OWNER** | Full access — all CRUD, reports, finance, user management, approvals |
| **ADMIN** | Create records freely; edits & deletes require owner approval |
| **SUPERVISOR** | Read-only — sees operations but cannot modify anything |

### Demo Credentials (after seeding)
| Code | User | Password | Role |
|------|------|----------|------|
| `JGM001` | Owner | `owner1234` | OWNER |
| `JGM001` | Admin | `admin1234` | ADMIN |
| `JGM001` | Supervisor | `super1234` | SUPERVISOR |

---

## 📦 Available Scripts

```bash
npm run dev          # Start dev server (backend + frontend concurrently)
npm run build        # Build React frontend for production
npm start            # Start production server (NODE_ENV=production)
npm run db:push      # Push Prisma schema to database (no migration files)
npm run db:seed      # Seed demo data
npm run db:studio    # Open Prisma Studio (database GUI)
npm run setup        # Full install: npm install + client install + prisma generate
```

---

## 🌐 Production Deployment

### Deploy to a Ubuntu VPS (Nginx + PM2)

```bash
# On your server
mkdir -p /var/www/millpro && cd /var/www/millpro

# Upload files (from local machine)
rsync -avz --exclude 'node_modules' --exclude 'client/dist' --exclude '.env' \
  ./ root@your-server:/var/www/millpro/

# On server
npm install --omit=dev
npx prisma generate
npx prisma db push

# Build frontend locally, then upload dist/
# (or build on server if RAM > 1GB)
rsync -avz client/dist/ root@your-server:/var/www/millpro/client/dist/

# Start with PM2
pm2 start server/index.js --name millpro
pm2 save && pm2 startup
```

**Nginx config** (`/etc/nginx/sites-available/millpro`):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/millpro/client/dist;
    index index.html;

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🗺️ Roadmap

- [ ] 📱 Mobile App (Android & iOS) — Q3 2026
- [ ] 📲 SMS payment alerts & low-stock notifications — Q3 2026
- [ ] 🏢 Multi-branch support — Q4 2026
- [ ] 🤖 AI production insights & yield optimisation — Q1 2027
- [ ] 💬 WhatsApp receipt sharing — Q1 2027
- [ ] 🏦 Automated bank reconciliation — Q2 2027

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for East African Milling Companies

**[Live Demo](http://178.128.206.214)** · **[Issues](https://github.com/Brianmatovu511/millpro/issues)**

</div>
