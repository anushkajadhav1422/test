# API Documentation

**Project:** Role-Based CRUD Application  
**Base URL (development):** `http://localhost:4000`  
**Content type:** `application/json`

## Authentication

Protected endpoints require an access token in the header:

```http
Authorization: Bearer <token>
```

Access tokens expire after one hour by default; the server setting `JWT_EXPIRES_IN_SECONDS` can change this. Public registration always creates a Student account. Admin accounts are created separately with the one-time `npm run seed:admin -w @rbac/server` command and the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables.

## Response Format

Successful endpoints return a `data` property:

```json
{
  "data": {}
}
```

Errors return an `error` property. Validation errors may also include field details:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed.",
    "details": [{ "path": "email", "message": "Invalid email" }]
  }
}
```

## Health

### `GET /api/health`

Checks API and database connectivity. No authentication required.

## Authentication Endpoints

### `POST /api/auth/register`

Creates a Student login and signs the user in.

**Request**

```json
{
  "email": "student@example.com",
  "password": "at-least-8-characters"
}
```

**Success:** `201 Created`

```json
{
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "<user-id>",
      "email": "student@example.com",
      "role": "Student"
    }
  }
}
```

### `POST /api/auth/login`

Authenticates an Admin or Student account.

**Request:** Same fields as registration.  
**Success:** `200 OK`, returning the same `data` shape as registration.  
**Invalid credentials:** `401 Unauthorized` with code `INVALID_CREDENTIALS`.

Password constraints: 8-128 characters. Email is validated and normalized to lowercase. Password hashes are never returned.

## Student Endpoints

All `/api/students` endpoints require a valid JWT and the `Admin` role. Student accounts cannot access student-record APIs. Student record fields are not linked to login accounts.

A student record contains:

```json
{
  "studentId": "S-1001",
  "firstName": "Avery",
  "lastName": "Morgan",
  "email": "avery@example.com",
  "program": "Computer Science"
}
```

All fields are required when creating a record. Values are trimmed; email is normalized to lowercase. Student ID must be unique. No delete endpoint is available in this release.

### `GET /api/students`

Lists student records, newest first.

**Success:** `200 OK`, with `data` as an array of student records.

### `POST /api/students`

Creates a student record.

**Request:** Student record fields above.  
**Success:** `201 Created`, with the created record in `data`.  
**Duplicate student ID:** `409 Conflict`.

### `GET /api/students/:id`

Returns one student record.

**Success:** `200 OK`.  
**Unknown or invalid ID:** `404 Not Found`.

### `PATCH /api/students/:id`

Updates one or more student fields. The request may include any non-empty subset of the create fields. Unknown fields are rejected.

**Success:** `200 OK`, with the updated record in `data`.  
**Unknown or invalid ID:** `404 Not Found`.  
**Duplicate student ID:** `409 Conflict`.

## Common Error Statuses

| Status | Meaning | Typical codes |
|---|---|---|
| `400` | Invalid JSON or request data | `INVALID_JSON`, `VALIDATION_ERROR` |
| `401` | Missing, invalid, or expired token; invalid login | `UNAUTHORIZED`, `INVALID_CREDENTIALS` |
| `403` | Authenticated role is not permitted | `FORBIDDEN` |
| `404` | Unknown route or student record | `NOT_FOUND`, `STUDENT_NOT_FOUND` |
| `409` | Duplicate unique value | `EMAIL_IN_USE`, `DUPLICATE_VALUE` |
| `500` | Unexpected server failure | `INTERNAL_SERVER_ERROR` |
