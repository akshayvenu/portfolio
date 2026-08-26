import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Formats a kilogram value the way the training log does: `70 kg` / `72.5 kg`. */
export function formatKg(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(1)} kg`;
}
