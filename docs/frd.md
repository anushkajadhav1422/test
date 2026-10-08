# Functional Requirements Document (FRD)

**Project:** Role-Based CRUD Application  
**Status:** Draft based on the available project context and implementation plan

## 1. Purpose

This document describes the user-facing workflows and expected application behavior for the Admin and Student roles. Exact field-level rules and screens should be reconciled with the detailed developer specification before implementation is finalized.

## 2. Roles and Access

| Area / Action | Visitor | Admin | Student |
|---|---:|---:|---:|
| Register or sign in | Yes | Yes | Yes |
| Admin dashboard | No | Yes | No |
| List student records | No | Yes | No |
| Create student record | No | Yes | No |
| View student details | No | Yes | No |
| Edit student record | No | Yes | No |
| Delete student record | No | No (excluded) | No |
| Student dashboard/profile | No | No | Yes |

All access restrictions in this matrix must be enforced by the backend. The frontend should also route users to the appropriate experience and avoid presenting unavailable actions.

## 3. Shared Interaction Requirements

- Protected pages require an authenticated session.
- Forms provide field-level validation feedback and prevent duplicate submission while a request is in progress.
- Data views distinguish loading, populated, empty, and failed states.
- Successful mutations provide confirmation and update or refresh the relevant view.
- Authentication or authorization failures provide a clear message and a safe next action, such as returning to login or the user's permitted dashboard.
- Exact copy, notification style, and API error format are TBD.

## 4. Functional Workflows

### FRD-FW-01: Registration

**Actor:** Visitor  
**Precondition:** User is signed out.

1. Visitor opens the registration page.
2. Visitor enters the required registration data.
3. Client validates the entered data and submits it to the authentication API.
4. Server validates the request, applies the approved role assignment policy, hashes the password, and creates the account.
5. Client displays the result and follows the agreed post-registration behavior.

**Alternate flows:** Invalid fields are shown for correction; duplicate account data returns an actionable error; server errors do not create a misleading success state.

Registration requires email and password, always creates a Student account, and signs the user in after successful creation. Admin accounts are created through the controlled server bootstrap command.

### FRD-FW-02: Login and Role Routing

**Actor:** Admin or Student  
**Precondition:** User has an account.

1. User enters credentials on the login page.
2. Client submits credentials to the authentication API.
3. Server verifies credentials and returns an authentication token and safe user information.
4. Client establishes the authenticated state.
5. Client routes the user to the Admin or Student area according to the authenticated role.

**Alternate flows:** Invalid credentials show a generic sign-in failure; a failed or expired session cannot access protected pages; unavailable API responses show a recoverable error.

### FRD-FW-03: Admin Student List

**Actor:** Admin  
**Precondition:** Admin is authenticated.

1. Admin opens the student management page.
2. Client requests the student list from the protected API.
3. Client displays returned records and available record actions.
4. If there are no records, client displays an empty state and the create action.

**Alternate flows:** Loading is visible while data is requested; API errors are shown without presenting stale data as current. Search, filters, sorting, and pagination are TBD.

### FRD-FW-04: Create Student

**Actor:** Admin  
**Precondition:** Admin is authenticated and authorized.

1. Admin opens the create-student page.
2. Admin enters the fields defined by the approved student schema.
3. Client validates fields and submits the request.
4. Server validates the request and creates the record.
5. Client confirms success and navigates to the agreed next view.

**Alternate flows:** Invalid or duplicate values are identified; server-side validation remains authoritative; failed requests preserve the user's entered values where safe.

### FRD-FW-05: View Student Details

**Actor:** Admin only.  
**Precondition:** The actor is authenticated and authorized for the requested record.

1. Actor selects a student record.
2. Client requests the record by identifier.
3. Client displays the approved student fields.

**Alternate flows:** A missing record displays a not-found state; unauthorized access is rejected by the backend and does not reveal protected record data.

### FRD-FW-06: Edit Student

**Actor:** Admin only.  
**Precondition:** Actor is authenticated and authorized for the record.

1. Actor opens the edit view for a record.
2. Client loads the current values.
3. Actor changes permitted fields and submits the form.
4. Server validates authorization and data, then persists the update.
5. Client confirms success and displays the updated values.

**Alternate flows:** Validation failures identify fields for correction; concurrent changes and stale-form behavior are TBD.

### FRD-FW-07: Student Record Deletion (Excluded)

Student record deletion is not available in the current release. The client shall not present a delete action and the API shall not expose a delete endpoint.

### FRD-FW-08: Student Dashboard and Profile

**Actor:** Student  
**Precondition:** Student is authenticated.

1. Student enters the Student area after login.
2. Client displays the authenticated account email and role.
3. Student may sign out.

Student login accounts are not linked to student records in this release. Student users cannot access the Admin student-record API or edit account details.

## 5. Screen Inventory

- Login page
- Registration page
- Admin layout and dashboard
- Student list page
- Create student page
- Student details page
- Edit student page
- Student layout and dashboard
- Student profile page

## 6. Form and Data Rules

- Registration and login validation rules are defined by the authentication schema.
- Student records require student ID, first name, last name, email, and course/program.
- Student ID is unique. Email is normalized to lowercase but is not unique in the current schema.
- Student create/update rules are defined by the student Zod schema; values are trimmed, and field lengths are bounded by that schema.
- Client validation improves usability; backend validation is required for correctness and security.

## 7. Acceptance Criteria

- Signed-out users cannot access protected role areas.
- Admin users can perform the confirmed student CRUD operations.
- Student users can access their Student area and only permitted data/actions.
- Role restrictions remain effective when API endpoints are called directly.
- Forms and data pages show appropriate loading, empty, validation, success, and error states.
- Passwords and other secret values are not exposed in screens or API responses.

## 8. Open Decisions

- Student fields, lack of account linking, and exclusion of deletion are confirmed for the current release.
- Define dashboard content, list search/pagination, and exact validation/error behavior.

## 9. Related Documents

- [Business Requirements Document](brd.md)
- [Software Requirements Specification](srs.md)
- [Project context](project-context.md)
- [Implementation plan](implementation-plan.md)
