import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentForm } from "../../components/admin/StudentForm";
import { ApiError } from "../../services/api";
import { getStudent, updateStudent } from "../../services/student.service";
import type { Student, StudentInput } from "../../types/student.types";

export default function EditStudentPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
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

  async function handleUpdate(input: StudentInput) {
    const updated = await updateStudent(id, input);
    navigate(`/admin/students/${updated.id}`, { replace: true });
  }

  if (error) return <div className="page-wrap"><p className="form-error" role="alert">{error}</p><Link to="/admin/students">Back to students</Link></div>;
  if (!student) return <div className="page-wrap"><p className="state-message" role="status">Loading student record...</p></div>;

  return (
    <div className="page-wrap">
      <header className="page-heading">
        <p className="eyebrow">ADMIN / RECORDS / EDIT</p>
        <h1>Edit student</h1>
        <p className="page-lede">Update the record for {student.firstName} {student.lastName}.</p>
      </header>
      <StudentForm key={student.id} initialValue={student} submitLabel="Save changes" onSubmit={handleUpdate} />
    </div>
  );
}
