import "server-only";

import fallbackSnapshot from "./fallback-snapshot.json";

import type { TrainingSnapshot } from "@/types/hevy";
import { apiFetch } from "@/lib/api";

/**
 * Single entry point for the Side Quest page.
 *
 * The training snapshot itself — live Hevy data or seeded sample data — is
 * assembled by the FastAPI backend (`backend/app/services/hevy`). If the
 * backend is unreachable, this falls back to a static fixture generated from
 * the backend's own sample path, so a portfolio page never 500s over it.
 */
export async function getTrainingSnapshot(): Promise<TrainingSnapshot> {
  try {
    return await apiFetch<TrainingSnapshot>("/api/v1/fitness/snapshot", ["hevy"]);
  } catch (error) {
    console.error("[hevy] backend unreachable, using fallback snapshot:", error);
    return fallbackSnapshot as TrainingSnapshot;
  }
}
