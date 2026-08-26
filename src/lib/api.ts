import "server-only";

/**
 * Thin server-side wrapper over the portfolio FastAPI backend.
 *
 * Only ever called from server components / route handlers — the base URL is
 * read from `NEXT_PUBLIC_API_URL` (public because the frontend may one day
 * need it client-side too, but every call site today runs on the server).
 */

const REVALIDATE_SECONDS = 60 * 60;

function apiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");
}

class ApiError extends Error {
  constructor(
    readonly status: number,
    path: string,
  ) {
    super(`Portfolio API ${status} for ${path}`);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(path: string, tags: string[] = []): Promise<T> {
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    headers: { accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });

  if (!response.ok) throw new ApiError(response.status, path);
  return (await response.json()) as T;
}
