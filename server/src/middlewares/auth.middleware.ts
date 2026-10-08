import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { HttpError } from "../utils/http-error.js";

export function requireAuth(request: Request, _response: Response, next: NextFunction): void {
  const authorization = request.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : undefined;

  if (!token) {
    next(new HttpError(401, "UNAUTHORIZED", "Authentication is required."));
    return;
  }

  try {
    request.user = verifyAccessToken(token);
    next();
  } catch {
    next(new HttpError(401, "UNAUTHORIZED", "The access token is invalid or expired."));
  }
}
