export const DATE_FORMATS = {
  DISPLAY: "MM/dd/yyyy",
  INPUT: "yyyy-MM-dd",
  EMPTY_DISPLAY: "No date",
  EMPTY_VALUE: "",
} as const;

export const DATE_VALIDATION = {
  MIN_YEAR: 2000,
  MAX_YEAR: 2100,
} as const;

export const DATE_FNS_OPTIONS = {
  weekStartsOn: 1,
} as const;
