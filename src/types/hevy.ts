/**
 * View models for the Side Quest page.
 *
 * These shapes are assembled server-side by the portfolio FastAPI backend
 * (`backend/app/schemas/fitness.py`, `backend/app/services/hevy/derive.py`)
 * from the Hevy public API (https://api.hevyapp.com/docs/) and served at
 * `GET /api/v1/fitness/snapshot`. This file is the contract between the two:
 * keep it in sync with the backend's Pydantic models.
 */

export interface TrainingStat {
  /** Stable key, also used for the icon lookup. */
  id: string;
  label: string;
  value: string;
  /** Small unit rendered after the value at reduced emphasis. */
  unit?: string;
  hint?: string;
}

export interface HeatmapDay {
  /** `YYYY-MM-DD`. */
  date: string;
  /** 0 = rest, 1–4 = increasing training volume for that day. */
  level: 0 | 1 | 2 | 3 | 4;
  workouts: number;
  volumeKg: number;
}

export interface MuscleSplitSlice {
  muscle: string;
  sets: number;
  share: number;
}

export interface PersonalRecord {
  exercise: string;
  exerciseTemplateId: string;
  weightKg: number;
  reps: number;
  /** Epley 1RM estimate, kg. */
  estimatedOneRepMaxKg: number;
  date: string;
}

export interface WorkoutSummary {
  id: string;
  title: string;
  startTime: string;
  durationMinutes: number;
  volumeKg: number;
  sets: number;
  prCount: number;
  exercises: {
    title: string;
    sets: number;
    topSet: string;
    muscle: string | null;
  }[];
}

export interface RoutineSummary {
  id: string;
  title: string;
  exerciseCount: number;
  setCount: number;
  focus: string[];
}

/** Everything the Side Quest page needs, assembled once on the server. */
export interface TrainingSnapshot {
  /** `live` when a Hevy key answered, `sample` when rendering seeded stand-ins. */
  source: "live" | "sample";
  syncedAt: string;
  stats: TrainingStat[];
  heatmap: HeatmapDay[];
  muscleSplit: MuscleSplitSlice[];
  records: PersonalRecord[];
  workouts: WorkoutSummary[];
  routines: RoutineSummary[];
}
