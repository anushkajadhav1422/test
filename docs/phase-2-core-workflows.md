# Phase 2: Core API and Role-Based User Workflows

## Goal

Implement secure authentication and student-record operations, then connect the Admin and Student frontend workflows to the API.

## Work Items

### Backend

- Implement separate User and Student models; Student login accounts remain unlinked to student records in this release.
- Add Zod schemas, services, controllers, routes, and middleware for authentication and student operations.
- Implement registration and login using bcrypt password hashing and JWT.
- Enforce authentication and role authorization on every protected server operation.
- Implement Admin-only student create, list, details, and update operations for student ID, first name, last name, email, and course/program. Deletion is excluded.
- Return consistent validation, authentication, authorization, not-found, and conflict errors.

### Frontend

- Implement shared API services, authentication context/hook, storage utilities, and typed client contracts.
- Build login and registration pages, protected routes, and role-aware redirects.
- Build the Admin layout, dashboard, and student list/create/details/edit pages.
- Build the Student layout, dashboard, and profile page.
- Add loading, empty, validation, success, and error states to data workflows.

## Deliverables

- Authentication and student APIs with documentation and Postman examples.
- Working Admin and Student application flows.
- User and student data stored as distinct, unlinked models, with approved role rules.

## Completion Checks

- Valid and invalid authentication paths behave correctly; passwords are not stored or returned in plaintext.
- Missing, invalid, or expired credentials and disallowed roles are rejected by the server.
- Admin can perform the confirmed student management workflow.
- Student accounts can access their own account area but cannot call Admin student-record endpoints.
- Client role routing and API authorization agree.
