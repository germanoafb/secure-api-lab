# Secure API Lab

A banking API (modular monolith) built with NestJS, focused on security and DevSecOps best practices.

## Stack

| Layer | Technology |
|--------|-----------|
| Runtime | Node.js 24 (LTS) |
| Framework | NestJS 12 (ESM) |
| Auth | JWT (access + refresh) + bcrypt |
| Database | PostgreSQL + TypeORM |
| Configuration | @nestjs/config + Zod (env validation) |
| Health Checks | @nestjs/terminus |
| Testing | Vitest (unit) + Supertest (e2e) |
| Security | Helmet, class-validator, @nestjs/throttler |

## Project Structure

```text
src/
├── main.ts
├── app.module.ts
├── config/          # Environment variable validation (Zod)
├── health/          # Health check (Terminus + TypeORM)
├── auth/            # Registration, login, refresh tokens
└── users/           # User CRUD operations
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 24+ (LTS)
- PostgreSQL 15+
- npm

### Installation & Run

```bash
# Clone the repository
git clone git@github.com:YOUR_USERNAME/secure-api-lab.git
cd secure-api-lab

# Install dependencies
npm install

# Create the environment file
cp .env.example .env

# Start the development server
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Environment Variables

The application uses environment variables for configuration. They are validated at startup with Zod (`src/config/env.validation.ts`): if a variable is missing or invalid, the app refuses to start and prints which one is wrong (fail fast).

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string (must be a valid URL) | Yes | - |
| `PORT` | HTTP port | No | `3000` |
| `NODE_ENV` | `development`, `test` or `production` | No | `development` |

Example `.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/secure_api
PORT=3000
NODE_ENV=development
```

> Never commit your `.env` file or expose database credentials in source control.

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check (DB connectivity, not rate limited) | No |
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | User login | No |
| GET | `/users/:id` | Fetch user details | Bearer Token |

## Security Features

- [x] Helmet (Security headers)
- [x] Global ValidationPipe (`whitelist` + `forbidNonWhitelisted`)
- [x] Global rate limiting (100 requests/min per IP)
- [x] Environment variables validated at startup (Zod)
- [x] Exact-pinned dependency versions
- [x] Graceful shutdown (`enableShutdownHooks`)
- [ ] Stricter rate limiting on `/auth/*` routes
- [ ] Bcrypt hashing (12 salt rounds)
- [ ] Short-lived JWTs (15m access token, 7d refresh token)
- [ ] Disabled stack traces in production errors

## Running Tests

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run test:e2e

# Run the linter
npm run lint
```

## Project Roadmap

- [x] NestJS Scaffold setup (ESM)
- [x] Modular monolith architecture (health, auth, users)
- [x] Health check module (Terminus + TypeORM)
- [x] Database integration (PostgreSQL + TypeORM)
- [x] Health check unit tests (mocked dependencies)
- [x] Environment validation (Zod, fail fast)
- [x] Security hardening (Helmet, ValidationPipe, rate limiting)
- [ ] Implement authentication (JWT + bcrypt)
- [ ] Dockerfile + docker-compose setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] SAST (Semgrep) + DAST (OWASP ZAP) implementation
- [ ] Cloud Deployment (OCI)

## License

This project is licensed under the MIT License.