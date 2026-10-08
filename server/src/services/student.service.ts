import { Types } from "mongoose";
import { Student } from "../models/Student.js";
import type { CreateStudentInput, UpdateStudentInput } from "../schemas/student.schema.js";
import { HttpError } from "../utils/http-error.js";

function toStudentResponse(student: {
  _id: Types.ObjectId;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: student._id.toString(),
    studentId: student.studentId,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    program: student.program,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  };
}

export async function createStudent(input: CreateStudentInput) {
  const student = await Student.create(input);
  return toStudentResponse(student.toObject());
}

export async function listStudents() {
  const students = await Student.find().sort({ createdAt: -1 }).lean();
  return students.map(toStudentResponse);
}

export async function getStudent(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpError(404, "STUDENT_NOT_FOUND", "Student record was not found.");
  }

  const student = await Student.findById(id).lean();
  if (!student) throw new HttpError(404, "STUDENT_NOT_FOUND", "Student record was not found.");
  return toStudentResponse(student);
}

export async function updateStudent(id: string, input: UpdateStudentInput) {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpError(404, "STUDENT_NOT_FOUND", "Student record was not found.");
  }

  const student = await Student.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  }).lean();
  if (!student) throw new HttpError(404, "STUDENT_NOT_FOUND", "Student record was not found.");
  return toStudentResponse(student);
}
