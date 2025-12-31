# Frontend Web - Company Profile

React-based company profile website with SEO optimization and responsive design.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3001

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, features, CTA |
| About | `/about` | Company story, values, team |
| Services | `/services` | Widget library, service offerings |
| Pricing | `/pricing` | Pricing tiers, FAQ |
| Contact | `/contact` | Contact form, info |

## Project Structure

```
src/
├── components/
│   └── layout/       # Header, Footer, Layout
├── pages/            # Route pages
├── services/         # API client
└── index.css         # Tailwind styles
```

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- Framer Motion (animations)
- React Helmet (SEO)
- Axios (API calls)
- Lucide React (icons)

## Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=DaaS Platform
```

## Build & Deploy

```bash
npm run build
npm run preview
```

## Docker

```bash
docker build -t daas-frontend-web .
docker run -p 80:80 daas-frontend-web
```
