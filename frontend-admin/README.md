# Frontend Admin - DaaS Dashboard

React-based SaaS admin dashboard with role-based access control.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3002

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |
| Dashboard | `/` | Analytics overview |
| Users | `/users` | User management |
| Services | `/services` | Service configuration |
| Metrics | `/metrics` | Usage & subscription |
| Settings | `/settings` | User settings |

## Project Structure

```
src/
├── components/
│   └── layout/       # Sidebar, Header, Layout
├── pages/
│   ├── auth/         # Login, Register
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── Services.tsx
│   ├── Metrics.tsx
│   └── Settings.tsx
├── store/            # Zustand stores
├── services/         # API client
└── index.css         # Tailwind styles
```

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- Zustand (state management)
- Recharts (charts)
- Framer Motion (animations)
- Lucide React (icons)

## State Management

Uses Zustand with persist middleware:
- `authStore` - Authentication state with localStorage persistence

## Authentication

- JWT tokens stored in localStorage
- Protected routes with `ProtectedRoute` component
- Automatic logout on 401 responses

## Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
```

## Build & Deploy

```bash
npm run build
npm run preview
```

## Docker

```bash
docker build -t daas-frontend-admin .
docker run -p 80:80 daas-frontend-admin
```
