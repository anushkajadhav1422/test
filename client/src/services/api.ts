import { API_BASE_URL } from "../utils/constants";
import { clearStoredSession, getStoredSession } from "../utils/storage";

interface ApiEnvelope<T> {
  data: T;
}

interface ApiFailure {
  error?: {
    code?: string;
    message?: string;
    details?: Array<{ path: string; message: string }>;
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly details: Array<{ path: string; message: string }> = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = getStoredSession()?.token;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<T>
    | ApiFailure
    | null;

  if (response.status === 401) {
    clearStoredSession();
    window.dispatchEvent(new Event("rbac:unauthorized"));
  }

  if (!response.ok) {
    const failure = payload as ApiFailure | null;
    throw new ApiError(
      failure?.error?.message ?? "The request could not be completed.",
      response.status,
      failure?.error?.code ?? "REQUEST_FAILED",
      failure?.error?.details ?? [],
    );
  }

  if (!payload || !("data" in payload)) {
    throw new ApiError("The API returned an unexpected response.", response.status, "INVALID_RESPONSE");
  }

  return payload.data;
}

export interface HealthResponse {
  status: "ok" | "unavailable";
  service: string;
  database: "connected" | "disconnected";
  timestamp: string;
}

export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/health`, { signal });
  const payload = (await response.json()) as HealthResponse;

  if (!response.ok) {
    throw new Error(
      payload.database === "disconnected"
        ? "The API is running, but MongoDB is disconnected."
        : "The API health check failed.",
    );
  }

  return payload;
}
