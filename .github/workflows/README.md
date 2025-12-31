# CI/CD Pipeline

This directory contains GitHub Actions workflows for the DaaS Platform.

## Workflows

### ci-cd.yml
Main CI/CD pipeline that runs on push to `main`/`develop` and PRs.

**Stages:**
1. **Backend Tests** - Lint, unit tests, E2E tests with PostgreSQL
2. **Frontend Web Tests** - Lint and build
3. **Frontend Admin Tests** - Lint and build
4. **Build & Push** - Docker images to GitHub Container Registry
5. **Deploy Staging** - Automatic on main branch
6. **Deploy Production** - Manual approval required

### code-quality.yml
Runs on PRs to check code quality:
- TypeScript type checking
- ESLint
- Security audit

### migrations.yml
Runs database migrations when changes in `database/migrations/` are pushed.

## Required Secrets

Configure these in your GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `DATABASE_URL` | Production database connection string |
| `JWT_SECRET` | JWT signing secret for production |

## Environments

Set up these environments in GitHub:
- `staging` - For staging deployments
- `production` - For production (enable required reviewers)

## Local Testing

```bash
# Test CI workflow locally with act
act -j backend-test
```
