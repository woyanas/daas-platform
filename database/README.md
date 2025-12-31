# Database Project - DaaS Platform

PostgreSQL database setup with migrations, seeds, and Docker configuration.

## Quick Start

```bash
# Start PostgreSQL
docker-compose up -d

# Verify connection
docker exec -it daas-postgres psql -U daas_user -d daas_db -c "\\dt"
```

## Structure

```
database/
├── migrations/          # SQL migration files (auto-run on startup)
│   ├── 001_create_users.sql
│   ├── 002_create_plans_subscriptions.sql
│   ├── 003_create_services.sql
│   ├── 004_create_dashboards_widgets.sql
│   ├── 005_create_audit_contact.sql
│   └── 006_create_refresh_tokens.sql
├── seeds/               # Seed data scripts
├── docs/                # Documentation
├── docker-compose.yml   # PostgreSQL container
└── README.md
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| POSTGRES_USER | daas_user | Database username |
| POSTGRES_PASSWORD | daas_password | Database password |
| POSTGRES_DB | daas_db | Database name |

## Connection Details

- **Host**: localhost
- **Port**: 5432
- **Database**: daas_db
- **Connection URL**: `postgresql://daas_user:daas_password@localhost:5432/daas_db`

## Tables

| Table | Description |
|-------|-------------|
| users | User accounts with roles |
| plans | Subscription pricing plans |
| subscriptions | User subscription records |
| services | Available platform services |
| service_configs | Per-user service settings |
| dashboards | User dashboards |
| widgets | Dashboard widgets |
| audit_logs | Activity tracking |
| contact_submissions | Contact form entries |
| usage_metrics | Usage statistics |
| refresh_tokens | JWT refresh tokens |
