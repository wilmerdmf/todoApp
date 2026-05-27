import { format, parse, parseISO, isValid, startOfDay } from "date-fns";
import { DATE_FORMATS } from "@/constants";

type DateValue = Date | null;

export const parseDisplayDate = (dateString: string): DateValue => {
  if (!dateString || dateString === DATE_FORMATS.EMPTY_VALUE || dateString === DATE_FORMATS.EMPTY_DISPLAY) {
    return null;
  }

  try {
    const parsedDate = parse(dateString, DATE_FORMATS.DISPLAY, new Date());
    return isValid(parsedDate) ? startOfDay(parsedDate) : null;
  } catch {
    return null;
  }
};

export const parseInputDate = (dateString: string): DateValue => {
  if (!dateString || dateString === DATE_FORMATS.EMPTY_VALUE) {
    return null;
  }

  try {
    const parsedDate = parseISO(dateString);
    return isValid(parsedDate) ? startOfDay(parsedDate) : null;
  } catch {
    return null;
  }
};

export const formatToDisplay = (date: DateValue): string => {
  if (!date || !isValid(date)) {
    return DATE_FORMATS.EMPTY_VALUE;
  }

  try {
    return format(date, DATE_FORMATS.DISPLAY);
  } catch {
    return DATE_FORMATS.EMPTY_VALUE;
  }
};

export const formatToInput = (date: DateValue): string => {
  if (!date || !isValid(date)) {
    return DATE_FORMATS.EMPTY_VALUE;
  }

  try {
    return format(date, DATE_FORMATS.INPUT);
  } catch {
    return DATE_FORMATS.EMPTY_VALUE;
  }
};

export const getTodayDate = (): Date => {
  return startOfDay(new Date());
};

export const getTodayDisplay = (): string => {
  return formatToDisplay(getTodayDate());
};

export const getTodayInput = (): string => {
  return formatToInput(getTodayDate());
};

export const convertToDisplay = (dateString: string): string => {
  if (!dateString || dateString === DATE_FORMATS.EMPTY_VALUE) {
    return DATE_FORMATS.EMPTY_VALUE;
  }

  const displayDate = parseDisplayDate(dateString);
  if (displayDate) {
    return dateString;
  }

  const inputDate = parseInputDate(dateString);
  if (inputDate) {
    return formatToDisplay(inputDate);
  }

  return DATE_FORMATS.EMPTY_VALUE;
};

export const convertToInput = (dateString: string): string => {
  if (!dateString || dateString === DATE_FORMATS.EMPTY_VALUE || dateString === DATE_FORMATS.EMPTY_DISPLAY) {
    return DATE_FORMATS.EMPTY_VALUE;
  }

  const inputDate = parseInputDate(dateString);
  if (inputDate) {
    return dateString;
  }

  const displayDate = parseDisplayDate(dateString);
  if (displayDate) {
    return formatToInput(displayDate);
  }

  return DATE_FORMATS.EMPTY_VALUE;
};
