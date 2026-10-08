import { useNavigate } from "react-router-dom";
import { StudentForm } from "../../components/admin/StudentForm";
import { createStudent } from "../../services/student.service";
import type { StudentInput } from "../../types/student.types";

export default function CreateStudentPage() {
  const navigate = useNavigate();

  async function handleCreate(input: StudentInput) {
    const student = await createStudent(input);
    navigate(`/admin/students/${student.id}`, { replace: true });
  }

  return (
    <div className="page-wrap">
      <header className="page-heading">
        <p className="eyebrow">ADMIN / RECORDS / NEW</p>
        <h1>Add student</h1>
        <p className="page-lede">Create a student record. This does not create a Student login account.</p>
      </header>
      <StudentForm submitLabel="Create record" onSubmit={handleCreate} />
    </div>
  );
}
