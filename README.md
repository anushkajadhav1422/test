# Role-Based CRUD Application

A TypeScript React client and Express API for an Admin/Student application. The application supports JWT authentication, role-protected areas, and Admin student record create/list/view/update workflows. Student login accounts and student records are separate; record deletion is not included.

## Prerequisites

- Node.js 20 or newer
- npm
- MongoDB available locally or through a connection URI

## Setup

From the repository root:

```powershell
npm install
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env.local
```

Update `server/.env` with the MongoDB connection string for your environment and replace the development `JWT_SECRET` with a private value of at least 32 characters. The API requires a valid MongoDB connection and exits with a clear error if the database cannot be reached.

Public registration creates Student accounts only. To create the first Admin, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env` and run this once:

```powershell
npm run seed:admin -w @rbac/server
```

The bootstrap command refuses to create another Admin if one already exists. Remove the bootstrap credentials from the environment after provisioning.

## Run

Start the API and client in separate terminals from the repository root:

```powershell
npm run dev:server
```

```powershell
npm run dev:client
```

The client is available at `http://localhost:5173`. The API health endpoint is `http://localhost:4000/api/health`; it reports the API and MongoDB connection status. Student API behavior and authentication responses are documented in `docs/api-documentation.md`.

## Checks

```powershell
npm run typecheck
npm run build
```

See `docs/implementation-plan.md` for the three implementation phases and the linked phase-specific plans.
