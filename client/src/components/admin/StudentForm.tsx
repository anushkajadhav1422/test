import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ApiError } from "../../services/api";
import type { Student, StudentInput } from "../../types/student.types";

const EMPTY_STUDENT: StudentInput = {
  studentId: "",
  firstName: "",
  lastName: "",
  email: "",
  program: "",
};

const FIELDS: Array<{ name: keyof StudentInput; label: string; type?: string }> = [
  { name: "studentId", label: "Student ID" },
  { name: "firstName", label: "First name" },
  { name: "lastName", label: "Last name" },
  { name: "email", label: "Email address", type: "email" },
  { name: "program", label: "Course / program" },
];

export function StudentForm({
  initialValue,
  submitLabel,
  onSubmit,
}: {
  initialValue?: Student;
  submitLabel: string;
  onSubmit: (input: StudentInput) => Promise<void>;
}) {
  const [values, setValues] = useState<StudentInput>(() => initialValue ? {
    studentId: initialValue.studentId,
    firstName: initialValue.firstName,
    lastName: initialValue.lastName,
    email: initialValue.email,
    program: initialValue.program,
  } : EMPTY_STUDENT);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (cause) {
      const detail = cause instanceof ApiError
        ? cause.details.map((issue) => issue.message).join(" ")
        : "";
      setError(cause instanceof ApiError ? `${cause.message} ${detail}`.trim() : "Unable to save this record. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {FIELDS.map((field) => (
          <label key={field.name} htmlFor={field.name}>
            <span>{field.label}</span>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              autoComplete={field.name === "email" ? "email" : "off"}
              maxLength={field.name === "email" ? 254 : 160}
              required
              value={values[field.name]}
              onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
            />
          </label>
        ))}
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-actions">
        <Link className="secondary-button" to="/admin/students">Cancel</Link>
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
