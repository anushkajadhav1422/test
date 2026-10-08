import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiError } from "../../services/api";
import { getStudent } from "../../services/student.service";
import type { Student } from "../../types/student.types";

export default function StudentDetailsPage() {
  const { id = "" } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getStudent(id)
      .then((record) => { if (active) setStudent(record); })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof ApiError ? cause.message : "Unable to load this record.");
      });
    return () => { active = false; };
  }, [id]);

  if (error) return <div className="page-wrap"><p className="form-error" role="alert">{error}</p><Link to="/admin/students">Back to students</Link></div>;
  if (!student) return <div className="page-wrap"><p className="state-message" role="status">Loading student record...</p></div>;

  return (
    <div className="page-wrap">
      <header className="page-heading page-heading-row">
        <div>
          <p className="eyebrow">ADMIN / RECORDS / {student.studentId}</p>
          <h1>{student.firstName} {student.lastName}</h1>
          <p className="page-lede">Student record details</p>
        </div>
        <Link className="primary-button link-button" to={`/admin/students/${student.id}/edit`}>Edit record <span aria-hidden="true">↗</span></Link>
      </header>
      <dl className="detail-list">
        <div><dt>Student ID</dt><dd>{student.studentId}</dd></div>
        <div><dt>First name</dt><dd>{student.firstName}</dd></div>
        <div><dt>Last name</dt><dd>{student.lastName}</dd></div>
        <div><dt>Email address</dt><dd>{student.email}</dd></div>
        <div><dt>Course / program</dt><dd>{student.program}</dd></div>
      </dl>
      <Link className="back-link" to="/admin/students">Back to students</Link>
    </div>
  );
}
