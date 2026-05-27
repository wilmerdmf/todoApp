import { Priority } from "@/types";

export const PRIORITIES: readonly Priority[] = ["Chill", "Medium", "Important"] as const;

export const DEFAULT_PRIORITY: Priority = "Chill";

export const PRIORITY_LABELS: Record<Priority, string> = {
  Chill: "Chill (Default)",
  Medium: "Medium",
  Important: "Important",
};
