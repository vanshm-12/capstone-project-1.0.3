# Bookworm — Online Bookstore

A full-stack e-commerce book store built with **Next.js 16** (frontend) and **Spring Boot 3.3.4** (backend), containerized with Podman.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui, Zustand, TanStack React Query, React Hook Form |
| Backend | Spring Boot 3.3.4, Spring Data JPA, Java 21, H2 (dev) / PostgreSQL (prod) |
| Infra | Podman Compose — 3 services (frontend, backend, database) on a shared bridge network |

## Project Structure

```
capstone-project-1.0.3/
├── frontend/          # Next.js app
├── backend/           # Spring Boot REST API (Maven)
└── infra/             # docker-compose.yml + .env.example
```

## Quick Start (local, no containers)

### 1. Backend

```bash
cd backend
mvn clean package
java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar
```

The backend seeds its catalog from `src/main/resources/data/products.json` on startup and runs on **port 8080**.

### 2. Frontend

```bash
cd frontend
npm install
npm run build
npm start
```

The frontend runs on **port 3000** and proxies `/api/*` to the backend.

### 3. Open

- Frontend: <http://localhost:3000>
- Backend API: <http://localhost:8080/api/products>
- H2 console: <http://localhost:8080/h2-console>

## Docker / Podman

Build and run all three services together:

```bash
cd frontend && podman build -t ecommerce-frontend .
cd backend  && podman build -t ecommerce-backend .
cd infra    && podman compose up
```

`docker-compose.yml` defines:
- `database` — `postgres:16-alpine` (DB: `productdb`)
- `backend` — Spring Boot app on `8080`
- `frontend` — Next.js production build on `3000`

## Catalog Data

Book data lives in `backend/src/main/resources/data/products.json` — a JSON array of product objects. `DataInitializer.java` refreshes the catalog idempotently on every startup (upsert keyed by `slug`), so editing the JSON and restarting is enough to update the store.

## Requirements

- Java 21
- Maven 3.9+
- Node.js 20+ (for the frontend)
- Podman or Docker (for containerized runs)