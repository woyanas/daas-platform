# DaaS Platform - Full Stack Dashboard as a Service

Production-ready, enterprise-grade dashboard platform with modular architecture.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend Layer                    │
├────────────────────────┬────────────────────────────┤
│   Company Profile Web  │     Admin Dashboard        │
│   (React + Tailwind)   │   (React + Zustand)        │
│   Port: 3001           │   Port: 3002               │
└──────────────┬─────────┴────────────┬───────────────┘
               │                      │
               ▼                      ▼
┌─────────────────────────────────────────────────────┐
│                   Backend API                       │
│              NestJS + TypeORM + JWT                 │
│                   Port: 3000                        │
└─────────────────────────┬───────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                     Database                        │
│                 PostgreSQL 16                       │
│                   Port: 5432                        │
└─────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
daas-platform/
├── backend/           # NestJS REST API
├── frontend-web/      # Company Profile (React)
├── frontend-admin/    # Admin Dashboard (React)
├── database/          # PostgreSQL migrations
├── docs/              # Documentation
└── docker-compose.yml # Full stack orchestration
```

## 🚀 Quick Start

### Development (Individual Services)

```bash
# 1. Start database
cd database && docker-compose up -d

# 2. Start backend
cd backend
cp .env.example .env
npm install
npm run start:dev

# 3. Start frontend-web
cd frontend-web
npm install
npm run dev

# 4. Start frontend-admin
cd frontend-admin
npm install
npm run dev
```

### Production (Docker Compose)

```bash
docker-compose up -d
```

## 🌐 URLs

| Service | URL |
|---------|-----|
| API | http://localhost:3000/api |
| API Docs (Swagger) | http://localhost:3000/api/docs |
| Company Website | http://localhost:3001 |
| Admin Dashboard | http://localhost:3002 |

## 🔐 Default Credentials

```
Email: admin@daas.local
Password: admin123
```

## 📚 Documentation

- [API Contracts](docs/api-contracts.md)
- [Backend README](backend/README.md)
- [Frontend Web README](frontend-web/README.md)
- [Frontend Admin README](frontend-admin/README.md)
- [Database README](database/README.md)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | NestJS, TypeORM, Passport JWT, Swagger |
| Frontend Web | React, Vite, Tailwind CSS, Framer Motion |
| Frontend Admin | React, Vite, Tailwind CSS, Zustand, Recharts |
| Database | PostgreSQL 16 |
| DevOps | Docker, Docker Compose |

## 📊 Features

### Backend
- ✅ JWT Authentication with refresh tokens
- ✅ Role-based access control (Admin/Editor/Viewer)
- ✅ User management
- ✅ Dashboard & widget management
- ✅ Service configuration
- ✅ Subscription & usage tracking
- ✅ Contact form handling
- ✅ Swagger API documentation

### Frontend Web (Company Profile)
- ✅ Home page with hero & features
- ✅ About page with team & values
- ✅ Services page with offerings
- ✅ Pricing page with tiers
- ✅ Contact page with form
- ✅ SEO optimized
- ✅ Responsive design

### Frontend Admin (Dashboard)
- ✅ Login & Registration
- ✅ Analytics dashboard with charts
- ✅ User management table
- ✅ Service configuration toggles
- ✅ Usage metrics & subscription
- ✅ Settings page
- ✅ Sidebar + header layout

## 📄 License

MIT
