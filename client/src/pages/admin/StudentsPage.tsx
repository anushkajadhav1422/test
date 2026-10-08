import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiError } from "../../services/api";
import { listStudents } from "../../services/student.service";
import type { Student } from "../../types/student.types";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listStudents()
      .then((records) => { if (active) setStudents(records); })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof ApiError ? cause.message : "Unable to load student records.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div className="page-wrap">
      <header className="page-heading page-heading-row">
        <div>
          <p className="eyebrow">ADMIN / RECORDS</p>
          <h1>Students</h1>
          <p className="page-lede">{students.length} {students.length === 1 ? "record" : "records"}</p>
        </div>
        <Link className="primary-button link-button" to="/admin/students/new">Add student <span aria-hidden="true">+</span></Link>
      </header>

      {loading && <p className="state-message" role="status">Loading student records...</p>}
      {!loading && error && <p className="form-error" role="alert">{error}</p>}
      {!loading && !error && students.length === 0 && (
        <section className="empty-state">
          <p className="eyebrow">NO RECORDS</p>
          <h2>Start with the first student.</h2>
          <p>Student accounts and student records are separate. Creating a record does not create a login.</p>
          <Link className="primary-button link-button" to="/admin/students/new">Create student record <span aria-hidden="true">↗</span></Link>
        </section>
      )}
      {!loading && !error && students.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student ID</th><th>Name</th><th>Email</th><th>Course / program</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.studentId}</td>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.program}</td>
                  <td className="table-actions">
                    <Link to={`/admin/students/${student.id}`}>View</Link>
                    <Link to={`/admin/students/${student.id}/edit`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
