# Business Requirements Document (BRD)

**Project:** Role-Based CRUD Application  
**Status:** Draft based on the available project context and implementation plan

## 1. Executive Summary

The project will deliver a web application for managing student records with separate experiences for Admin and Student users. Administrators manage student records, while students access a dashboard and profile area. The solution uses a React/TypeScript client, an Express/TypeScript API, and MongoDB, with JWT authentication and bcrypt password hashing.

## 2. Business Need

Student information needs a structured application workflow with role-appropriate access. The system should provide authorized administrators with student record management capabilities while limiting student access to their permitted area and information.

## 3. Business Objectives

- Provide a single application for the defined Admin and Student workflows.
- Allow authorized Admin users to create, view, list, and update student records; deletion is part of the intended CRUD scope and must be confirmed against the detailed specification.
- Provide Student users with a dashboard and profile experience.
- Protect application and student data through authentication and server-enforced role authorization.
- Establish maintainable client, API, and data layers that support validation and future changes.

## 4. Stakeholders and Users

- **Business owner / product stakeholder:** Confirms business rules, student data, and acceptance criteria.
- **Administrator:** Manages student records and uses the Admin dashboard.
- **Student:** Uses the Student dashboard and profile.
- **Development and operations team:** Builds, deploys, and maintains the client, API, and database.

## 5. Scope

### In Scope

- Admin and Student roles.
- Authentication through registration and login workflows.
- Admin dashboard and student record management.
- Student dashboard and profile.
- Role-aware client routing and server-side authorization.
- MongoDB persistence, request validation, and API documentation.

### Out of Scope Unless Confirmed

- Additional roles or organization/tenant management.
- Payments, grading, attendance, messaging, or learning-management features.
- Bulk import/export, advanced reporting, or notification delivery.
- Specific deployment platform, service-level commitments, and integrations.

## 6. Business Requirements

| ID | Requirement | Priority |
|---|---|---|
| BR-01 | The system shall distinguish Admin users from Student users. | Must |
| BR-02 | An Admin shall be able to create, list, view, and update student records. | Must |
| BR-03 | Student record deletion is excluded from the current release and may be reconsidered later. | Out of scope |
| BR-04 | A Student shall have access to a Student dashboard and profile experience. | Must |
| BR-05 | The system shall restrict protected functionality according to the authenticated user's role. | Must |
| BR-06 | Student users shall only access student information they are authorized to view or change. | Must |
| BR-07 | The system shall validate submitted data and provide actionable success or error feedback. | Must |
| BR-08 | The initial Admin account shall be provisioned through a controlled process that prevents public self-assignment of Admin privileges. | Must |

## 7. Business Rules

- A user must authenticate before accessing protected areas.
- Admin authorization must be enforced by the server, not only by hiding client routes or controls.
- Public registration creates a Student login and must not allow role assignment.
- Student login accounts are separate from student records in the current release.
- Initial Admin access is provisioned through a controlled one-time command.
- Passwords must not be stored or returned in plaintext.

## 8. Success Measures

- An Admin can complete the confirmed student management workflows successfully.
- A Student can access the appropriate dashboard and profile without accessing another student's restricted data.
- Unauthorized and unauthenticated requests to protected operations are rejected.
- The client and server build and type-check, and the documented primary workflows pass end-to-end tests.
- Exact response-time, availability, and adoption targets are to be defined by the business owner.

## 9. Assumptions, Dependencies, and Open Decisions

- MongoDB is the selected persistence layer; hosting and backup requirements remain to be decided.
- Student records contain student ID, first name, last name, email, and course/program; student ID is unique.
- Student record deletion, student-to-account linking, search/pagination, and richer dashboard content are deferred.
- The initial Admin is created through the server's one-time `seed:admin` command. JWT expiry defaults to one hour; the client stores the session in tab-scoped session storage.
- API and deployment environments require appropriate secret management and secure transport.

## 10. Related Documents

- [Project context](project-context.md)
- [Implementation plan](implementation-plan.md)
- [Software Requirements Specification](srs.md)
- [Functional Requirements Document](frd.md)
