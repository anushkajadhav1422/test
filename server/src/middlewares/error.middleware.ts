import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/http-error.js";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof HttpError) {
    return response.status(error.status).json({
      error: { code: error.code, message: error.message },
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed.",
        details: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
  }

  if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
    return response.status(409).json({
      error: { code: "DUPLICATE_VALUE", message: "A record with this value already exists." },
    });
  }

  if (
    error instanceof SyntaxError &&
    typeof error === "object" &&
    "status" in error &&
    error.status === 400
  ) {
    return response.status(400).json({
      error: { code: "INVALID_JSON", message: "Request body contains invalid JSON." },
    });
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  return response.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred." },
  });
};
