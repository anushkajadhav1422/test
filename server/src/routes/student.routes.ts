import { Router } from "express";
import {
  createStudentController,
  getStudentController,
  listStudentsController,
  updateStudentController,
} from "../controllers/student.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const studentRoutes = Router();
studentRoutes.use(requireAuth, requireRole("Admin"));
studentRoutes.get("/", listStudentsController);
studentRoutes.post("/", createStudentController);
studentRoutes.get("/:id", getStudentController);
studentRoutes.patch("/:id", updateStudentController);

export default studentRoutes;
