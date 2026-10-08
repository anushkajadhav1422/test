# Software Requirements Specification (SRS)

**Project:** Role-Based CRUD Application  
**Status:** Draft based on the available project context and implementation plan

## 1. Purpose

This document defines system-level functional and quality requirements for the role-based student CRUD application. Requirements marked **TBD** require confirmation from the detailed developer specification or product stakeholder before implementation is considered final.

## 2. Product Scope

The product consists of a React with TypeScript frontend, a Node.js/Express with TypeScript backend, and MongoDB persistence. It supports Admin and Student users, JWT-based authentication, bcrypt password hashing, and Zod request validation.

## 3. User Classes

- **Unauthenticated visitor:** May use only the public authentication workflows.
- **Admin:** May use the Admin area and manage student records as authorized.
- **Student:** May use the Student dashboard and permitted profile/data functions.

## 4. Functional Requirements

### Authentication and Access Control

- **SRS-FR-01:** The system shall provide registration and login workflows.
- **SRS-FR-02:** The backend shall hash passwords with bcrypt before persistence and shall not return password hashes in API responses.
- **SRS-FR-03:** Successful authentication shall issue a JWT containing the identity and authorization information needed by protected API operations.
- **SRS-FR-04:** The backend shall reject protected requests with missing, invalid, or expired authentication credentials.
- **SRS-FR-05:** The backend shall enforce role authorization for protected operations. Client route guards shall not be treated as the security boundary.
- **SRS-FR-06:** Public registration shall create a Student account and shall not permit role assignment. The initial Admin is provisioned by a controlled one-time server command.
- **SRS-FR-07:** The client shall direct authenticated users to role-appropriate areas and handle authentication failures or expired sessions.

### Student Record Management

- **SRS-FR-08:** An authorized Admin shall be able to create student records.
- **SRS-FR-09:** An authorized Admin shall be able to retrieve a student list and an individual student record.
- **SRS-FR-10:** An authorized Admin shall be able to update a student record.
- **SRS-FR-11:** Student record deletion is excluded from the current release; no delete operation shall be exposed.
- **SRS-FR-12:** The backend shall validate student create/update requests with Zod and return consistent validation errors.
- **SRS-FR-13:** Student login accounts shall remain separate from student records in the current release. Student users shall not access the Admin student-record API.

### Role-Specific Experiences

- **SRS-FR-14:** The application shall provide an Admin dashboard and Admin-protected student management pages.
- **SRS-FR-15:** The application shall provide a Student dashboard and profile page.
- **SRS-FR-16:** The client shall display loading, empty, success, and error states for data-dependent workflows.

### API and Persistence

- **SRS-FR-17:** The backend shall separate routing, controllers, services, schemas, models, and middleware according to the project structure.
- **SRS-FR-18:** The client shall access backend operations through shared API services.
- **SRS-FR-19:** The system shall persist users and student records as distinct, unlinked concepts/models. Student records shall contain student ID, first name, last name, email, and course/program; student ID shall be unique.

## 5. External Interface Requirements

### User Interface

- The UI shall provide separate role-appropriate layouts and protected routes.
- Forms shall show field validation and submission feedback.
- Exact labels, visual design, responsive breakpoints, and accessibility acceptance criteria are TBD.

### API Interface

- The API shall expose authentication and student operations through separate route modules.
- Request and response schemas, route paths, status codes, and error envelope are documented in `api-documentation.md`. Pagination is deferred.

### Database Interface

- MongoDB shall persist user and student data.
- Student ID is unique. All five confirmed student fields are required. Student records are not linked to login accounts in the current release. Retention and backup requirements remain TBD.

## 6. Data Requirements

- A user record shall include credentials in hashed form and a role identifying Admin or Student.
- A student record shall contain the student attributes approved in the detailed specification; the field list is TBD.
- API responses shall exclude secrets and password hashes.
- Data ownership and deletion behavior shall be explicitly defined before release.

## 7. Security Requirements

- Authentication and role authorization shall be enforced server-side on every protected operation.
- Passwords shall be hashed with bcrypt; plaintext passwords shall not be logged or persisted.
- JWT signing secrets shall be provided through environment configuration and shall not be committed.
- Production API traffic shall use HTTPS.
- Inputs shall be validated before they reach domain operations or persistence.
- The client stores JWT sessions in tab-scoped session storage; the access token expires after the configured interval (one hour by default). CORS is restricted to the configured client origin. Refresh tokens, server-side revocation, rate limiting, and audit logging are not implemented in this release.

## 8. Quality Requirements

- **Maintainability:** Client and server shall remain separately organized and use TypeScript types at their boundaries.
- **Reliability:** Database connection failures and API errors shall fail clearly and return consistent responses.
- **Compatibility:** Supported browsers and runtime versions are TBD.
- **Performance:** Response-time and expected-load targets are TBD.
- **Accessibility:** Accessibility conformance target and test scope are TBD.
- **Observability:** Logging, monitoring, and operational alert requirements are TBD.

## 9. Verification Requirements

- Unit tests shall cover validation, services, and authorization middleware.
- Integration tests shall cover authentication and student API behavior, including unauthorized access.
- End-to-end tests shall cover primary Admin and Student workflows.
- Client and server shall type-check and build successfully before release.

## 10. Traceability

Business goals and scope are defined in [BRD](brd.md). User-visible workflows are defined in [FRD](frd.md). Project architecture and delivery sequencing are described in [project context](project-context.md) and the [implementation plan](implementation-plan.md).
