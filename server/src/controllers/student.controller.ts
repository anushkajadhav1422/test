import type { Request, Response } from "express";
import { createStudentSchema, updateStudentSchema } from "../schemas/student.schema.js";
import { createStudent, getStudent, listStudents, updateStudent } from "../services/student.service.js";

export async function createStudentController(request: Request, response: Response): Promise<void> {
  const input = createStudentSchema.parse(request.body);
  const student = await createStudent(input);
  response.status(201).json({ data: student });
}

export async function listStudentsController(_request: Request, response: Response): Promise<void> {
  const students = await listStudents();
  response.status(200).json({ data: students });
}

export async function getStudentController(request: Request, response: Response): Promise<void> {
  const student = await getStudent(request.params.id);
  response.status(200).json({ data: student });
}

export async function updateStudentController(request: Request, response: Response): Promise<void> {
  const input = updateStudentSchema.parse(request.body);
  const student = await updateStudent(request.params.id, input);
  response.status(200).json({ data: student });
}
