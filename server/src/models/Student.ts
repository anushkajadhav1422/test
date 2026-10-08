import { Schema, model } from "mongoose";

export interface StudentDocument {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<StudentDocument>(
  {
    studentId: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    program: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Student = model<StudentDocument>("Student", studentSchema);
