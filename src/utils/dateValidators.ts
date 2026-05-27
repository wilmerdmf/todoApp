import { isBefore, isAfter, isSameDay, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { parseDisplayDate, parseInputDate, getTodayDate } from "./dateUtils";
import { DATE_VALIDATION } from "@/constants";

interface DateValidationResult {
  isValid: boolean;
  error: string | null;
}

export const isValidDisplayFormat = (dateString: string): DateValidationResult => {
  if (!dateString || typeof dateString !== "string") {
    return { isValid: false, error: "Date is required" };
  }

  const displayDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!displayDateRegex.test(dateString)) {
    return { isValid: false, error: "Date must be in MM/dd/yyyy format" };
  }

  const date = parseDisplayDate(dateString);
  if (!date) {
    return { isValid: false, error: "Invalid date" };
  }

  const year = date.getFullYear();
  if (year < DATE_VALIDATION.MIN_YEAR || year > DATE_VALIDATION.MAX_YEAR) {
    return {
      isValid: false,
      error: `Year must be between ${DATE_VALIDATION.MIN_YEAR} and ${DATE_VALIDATION.MAX_YEAR}`,
    };
  }

  return { isValid: true, error: null };
};

export const isValidInputFormat = (dateString: string): DateValidationResult => {
  if (!dateString || typeof dateString !== "string") {
    return { isValid: false, error: "Date is required" };
  }

  const inputDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!inputDateRegex.test(dateString)) {
    return { isValid: false, error: "Date must be in yyyy-MM-dd format" };
  }

  const date = parseInputDate(dateString);
  if (!date) {
    return { isValid: false, error: "Invalid date" };
  }

  const year = date.getFullYear();
  if (year < DATE_VALIDATION.MIN_YEAR || year > DATE_VALIDATION.MAX_YEAR) {
    return {
      isValid: false,
      error: `Year must be between ${DATE_VALIDATION.MIN_YEAR} and ${DATE_VALIDATION.MAX_YEAR}`,
    };
  }

  return { isValid: true, error: null };
};

export const isPastDate = (dateString: string): boolean => {
  const date = parseDisplayDate(dateString) || parseInputDate(dateString);
  if (!date) return false;

  const today = getTodayDate();
  return isBefore(date, today);
};

export const isFutureDate = (dateString: string): boolean => {
  const date = parseDisplayDate(dateString) || parseInputDate(dateString);
  if (!date) return false;

  const today = getTodayDate();
  return isAfter(date, today);
};

export const isToday = (dateString: string): boolean => {
  const date = parseDisplayDate(dateString) || parseInputDate(dateString);
  if (!date) return false;

  const today = getTodayDate();
  return isSameDay(date, today);
};

export const isThisWeek = (dateString: string): boolean => {
  const date = parseDisplayDate(dateString) || parseInputDate(dateString);
  if (!date) return false;

  const today = getTodayDate();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  return isWithinInterval(date, { start: weekStart, end: weekEnd });
};
