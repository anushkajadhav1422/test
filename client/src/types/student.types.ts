export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  createdAt: string;
  updatedAt: string;
}

export type StudentInput = Pick<Student, "studentId" | "firstName" | "lastName" | "email" | "program">;
