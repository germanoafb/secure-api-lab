# Secure API Lab

A banking API (modular monolith) built with NestJS, focused on security and DevSecOps best practices.

## Stack

| Layer | Technology |
|--------|-----------|
| Runtime | Node.js 24 (LTS) |
| Framework | NestJS 12 (ESM) |
| Auth | JWT (access + refresh) + bcrypt |
| Database | PostgreSQL (coming soon) |
| Testing | Vitest (unit) + Supertest (e2e) |
| Security | Helmet, class-validator, Rate Limiting |

## Project Structure

```text
src/
├── main.ts
├── app.module.ts
├── health/          # Health check
├── auth/            # Registration, login, refresh tokens
└── users/           # User CRUD operations
```

## Getting Started

### Prerequisites
Make sure you have Node.js 24+ installed.

### Installation & Run

```bash
# Clone the repository
git clone git@github.com:YOUR_USERNAME/secure-api-lab.git
cd secure-api-lab

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | User login | No |
| GET | `/users/:id` | Fetch user details | Bearer Token |

## Security Features

- [ ] Helmet (Security headers)
- [ ] Global ValidationPipe
- [ ] Rate limiting on `/auth/*` routes
- [ ] Bcrypt hashing (12 salt rounds)
- [ ] Short-lived JWTs (15m access token, 7d refresh token)
- [ ] Disabled stack traces in production errors

## Running Tests

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run test:e2e
```

## Project Roadmap

- [x] NestJS Scaffold setup (ESM)
- [x] Modular monolith architecture (health, auth, users)
- [ ] Implement authentication (JWT + bcrypt)
- [ ] Database integration (PostgreSQL + Prisma)
- [ ] Dockerfile + docker-compose setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] SAST (Semgrep) + DAST (OWASP ZAP) implementation
- [ ] Cloud Deployment (OCI)

## License

This project is licensed under the MIT License.
