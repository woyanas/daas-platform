# API Contracts - DaaS Platform

OpenAPI 3.0 specification for the DaaS REST API.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Bearer token authentication:
```
Authorization: Bearer <access_token>
```

---

## Endpoints

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login | ❌ |
| POST | `/auth/refresh` | Refresh token | ❌ |
| POST | `/auth/logout` | Logout | ✅ |

#### POST /auth/register
```json
// Request
{ "email": "user@example.com", "password": "123456", "fullName": "John Doe" }

// Response 201
{ "accessToken": "jwt...", "refreshToken": "uuid", "user": { "id": "uuid", "email": "...", "fullName": "...", "role": "viewer" } }
```

#### POST /auth/login
```json
// Request
{ "email": "user@example.com", "password": "123456" }

// Response 200
{ "accessToken": "jwt...", "refreshToken": "uuid", "user": { ... } }
```

---

### Users

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/users` | List users | ✅ | Admin |
| GET | `/users/me` | Get profile | ✅ | Any |
| PATCH | `/users/me` | Update profile | ✅ | Any |
| GET | `/users/stats` | User stats | ✅ | Admin |
| PATCH | `/users/:id/role` | Update role | ✅ | Admin |
| DELETE | `/users/:id` | Deactivate | ✅ | Admin |

---

### Dashboards

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/dashboards` | List dashboards | ✅ |
| POST | `/dashboards` | Create dashboard | ✅ |
| GET | `/dashboards/:id` | Get dashboard | ✅ |
| PATCH | `/dashboards/:id` | Update dashboard | ✅ |
| DELETE | `/dashboards/:id` | Delete dashboard | ✅ |
| POST | `/dashboards/:id/widgets` | Add widget | ✅ |
| PATCH | `/dashboards/widgets/:id` | Update widget | ✅ |
| DELETE | `/dashboards/widgets/:id` | Delete widget | ✅ |

---

### Services

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/services` | List services | ✅ |
| GET | `/services/my-config` | User configs | ✅ |
| PATCH | `/services/:id/config` | Update config | ✅ |

---

### Subscriptions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/subscriptions/plans` | List plans | ❌ |
| GET | `/subscriptions/current` | Current sub | ✅ |
| POST | `/subscriptions/subscribe` | Subscribe | ✅ |
| DELETE | `/subscriptions/cancel` | Cancel | ✅ |
| GET | `/subscriptions/usage` | Usage metrics | ✅ |

---

### Contact

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/contact` | Submit form | ❌ |
| GET | `/contact` | List submissions | ✅ Admin |

---

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |

```json
// Response
{ "status": "ok", "timestamp": "2024-01-01T00:00:00.000Z", "uptime": 12345.67 }
```

---

## Error Responses

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found |
| 409 | Conflict - Resource exists |
| 500 | Internal Server Error |
