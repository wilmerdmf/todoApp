export const ERROR_MESSAGES = {
  CARD_TITLE_REQUIRED: "Card title is required",
  INVALID_DATE_FORMAT: "Invalid date format, using empty date",
  PROJECT_CREATE_ERROR: "Error creating project. Please try again.",
  PROJECT_DELETE_ERROR: "Error deleting project. Please try again.",
  CARD_CREATE_ERROR: "Error saving card. Please try again.",
  CARD_DELETE_ERROR: "Error deleting card. Please try again.",
  LOAD_DATA_ERROR: "Error loading data from server",
} as const;

export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: "Project created successfully",
  PROJECT_DELETED: "Project deleted successfully",
  CARD_CREATED: "Card created successfully",
  CARD_UPDATED: "Card updated successfully",
  CARD_DELETED: "Card deleted successfully",
} as const;

export const UI_TEXT = {
  NO_PROJECT: "No project",
  NO_DATE: "No date",
  LOADING: "Loading...",
  RETRY: "Retry",
} as const;
