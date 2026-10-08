import { z } from "zod";

const studentFields = {
  studentId: z.string().trim().min(1).max(64),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  program: z.string().trim().min(1).max(160),
};

export const createStudentSchema = z.object(studentFields).strict();
export const updateStudentSchema = z.object(studentFields).partial().strict().refine(
  (student) => Object.keys(student).length > 0,
  "At least one field must be provided.",
);

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
