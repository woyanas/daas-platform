# Backend API - DaaS Platform

NestJS REST API with JWT authentication, RBAC, and comprehensive business logic.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run start:dev
```

## API Documentation

Once running, visit: `http://localhost:3000/api/docs`

## Project Structure

```
src/
├── modules/
│   ├── auth/           # JWT authentication, refresh tokens
│   ├── users/          # User CRUD, role management
│   ├── dashboards/     # Dashboard & widget management
│   ├── services/       # Platform service configuration
│   ├── subscriptions/  # Plans, subscriptions, usage metrics
│   ├── contact/        # Contact form submissions
│   └── health/         # Health check endpoint
├── common/             # Shared guards, decorators, filters
└── main.ts             # Application entry point
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start:prod` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Lint code |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

### Users (Admin)
- `GET /api/users` - List all users
- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update profile
- `GET /api/users/stats` - Get user statistics

### Dashboards
- `GET /api/dashboards` - List user dashboards
- `POST /api/dashboards` - Create dashboard
- `GET /api/dashboards/:id` - Get dashboard with widgets
- `PATCH /api/dashboards/:id` - Update dashboard
- `DELETE /api/dashboards/:id` - Delete dashboard
- `POST /api/dashboards/:id/widgets` - Add widget
- `PATCH /api/dashboards/widgets/:id` - Update widget
- `DELETE /api/dashboards/widgets/:id` - Delete widget

### Services
- `GET /api/services` - List available services
- `GET /api/services/my-config` - Get user service configs
- `PATCH /api/services/:id/config` - Update service config

### Subscriptions
- `GET /api/subscriptions/plans` - List pricing plans
- `GET /api/subscriptions/current` - Get current subscription
- `POST /api/subscriptions/subscribe` - Subscribe to plan
- `DELETE /api/subscriptions/cancel` - Cancel subscription
- `GET /api/subscriptions/usage` - Get usage metrics

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - List submissions (Admin)
- `PATCH /api/contact/:id/read` - Mark as read

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `DATABASE_HOST` | localhost | PostgreSQL host |
| `DATABASE_PORT` | 5432 | PostgreSQL port |
| `DATABASE_USER` | daas_user | Database user |
| `DATABASE_PASSWORD` | daas_password | Database password |
| `DATABASE_NAME` | daas_db | Database name |
| `JWT_SECRET` | - | JWT signing secret |
| `JWT_ACCESS_EXPIRES_IN` | 15m | Access token expiry |
| `JWT_REFRESH_EXPIRES_IN` | 7d | Refresh token expiry |
| `CORS_ORIGIN` | localhost:3001,3002 | Allowed origins |

## Docker

```bash
# Build image
docker build -t daas-backend .

# Run container
docker run -p 3000:3000 --env-file .env daas-backend
```
