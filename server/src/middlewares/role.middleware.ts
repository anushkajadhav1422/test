import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types/auth.types.js";
import { HttpError } from "../utils/http-error.js";

export function requireRole(...allowedRoles: UserRole[]) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    if (!request.user || !allowedRoles.includes(request.user.role)) {
      next(new HttpError(403, "FORBIDDEN", "You do not have permission to perform this action."));
      return;
    }

    next();
  };
}
