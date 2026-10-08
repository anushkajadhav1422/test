import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { login, register } from "../services/auth.service.js";

export async function registerController(request: Request, response: Response): Promise<void> {
  const credentials = registerSchema.parse(request.body);
  const result = await register(credentials);
  response.status(201).json({ data: result });
}

export async function loginController(request: Request, response: Response): Promise<void> {
  const credentials = loginSchema.parse(request.body);
  const result = await login(credentials);
  response.status(200).json({ data: result });
}
