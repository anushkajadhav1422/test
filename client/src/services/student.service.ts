import { apiRequest } from "./api";
import type { Student, StudentInput } from "../types/student.types";

export function listStudents(): Promise<Student[]> {
  return apiRequest<Student[]>("/api/students");
}

export function getStudent(id: string): Promise<Student> {
  return apiRequest<Student>(`/api/students/${encodeURIComponent(id)}`);
}

export function createStudent(input: StudentInput): Promise<Student> {
  return apiRequest<Student>("/api/students", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateStudent(id: string, input: StudentInput): Promise<Student> {
  return apiRequest<Student>(`/api/students/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
