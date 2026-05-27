import { Notification, FormErrors } from "./index";

export type Priority = "Chill" | "Medium" | "Important";

export type MenuOption = "home" | "today" | "week" | `project:${string}`;

export interface DateInfo {
  hasDate: boolean;
  isOverdue: boolean;
  isToday: boolean;
  isFuture: boolean;
  displayText: string;
  dateClassName: string;
}

export interface ToastProps {
  notification: Notification;
}

export interface DateDisplayProps {
  date: string;
  className?: string;
}

export interface UseFormValidationReturn {
  errors: FormErrors;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
  hasErrors: boolean;
  getError: (field: string) => string | undefined;
  setErrors: (newErrors: FormErrors) => void;
}
