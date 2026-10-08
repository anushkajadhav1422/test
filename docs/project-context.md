# Role-Based CRUD Application: Project Context

## Purpose

Build a role-based application for managing student records. The application has two roles: **Admin** and **Student**. Administrators manage student records; students have a dashboard and profile area.

## Technology

- **Frontend:** React with TypeScript
- **Backend:** Node.js, Express, and TypeScript
- **Database:** MongoDB
- **Authentication:** JWT
- **Password hashing:** bcrypt
- **Validation:** Zod

## Application Areas

### Admin

- Sign in and register through the authentication pages.
- View the admin dashboard.
- Create, list, view, and edit student records.
- Use admin-specific layouts, components, and protected routes.

### Student

- Access a student dashboard and profile.
- Use student-specific layouts, components, and protected routes.

The frontend separates role-aware pages and layouts. The backend separates authentication and student routes, controllers, services, and middleware. Authentication and role checks should be applied to the relevant protected operations.

## Code Organization

- `client/` contains the React application. Its `src/` separates components, pages, layouts, routes, API services, authentication context and hooks, types, and utilities.
- `server/` contains the Express application. Its `src/` separates database configuration, models, schemas, controllers, services, routes, middleware, utilities, and Express types.
- `docs/` contains requirements, architecture, database design, API documentation, and the Postman collection.

## Implementation Boundaries

- Keep frontend and backend responsibilities separate; the client calls the server through the API services.
- Keep input validation in Zod schemas and domain operations in services.
- Hash passwords with bcrypt and use JWT-based authentication.
- Enforce authorization on the server for protected operations; frontend route guards provide role-appropriate navigation but are not a substitute for server checks.
- Keep the user/authentication model distinct from the student-record model, as indicated by the separate `User` and `Student` models.

## Detailed Requirements

The requirements, architecture, database design, and API contract should be maintained in their respective documents under `docs/` as implementation decisions are finalized. This context summarizes the project brief and supplied folder outline; detailed acceptance criteria should be taken from the developer specification.
