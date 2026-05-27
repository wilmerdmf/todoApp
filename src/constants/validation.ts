export const VALIDATION = {
  CARD_TITLE_MIN_LENGTH: 1,
  CARD_TITLE_MAX_LENGTH: 22,
  CARD_DESCRIPTION_MAX_LENGTH: 80,

  PROJECT_NAME_MIN_LENGTH: 1,
  PROJECT_NAME_MAX_LENGTH: 15,
} as const;

export const VALIDATION_MESSAGES = {
  CARD_TITLE_REQUIRED: "Card title is required",
  CARD_TITLE_EMPTY: "Card title cannot be empty",
  CARD_TITLE_TOO_SHORT: `Card title must be at least ${VALIDATION.CARD_TITLE_MIN_LENGTH} character`,
  CARD_TITLE_TOO_LONG: `Card title cannot exceed ${VALIDATION.CARD_TITLE_MAX_LENGTH} characters`,
  CARD_TITLE_WHITESPACE: "Card title cannot be only whitespace",
  CARD_DESCRIPTION_TOO_LONG: `Description cannot exceed ${VALIDATION.CARD_DESCRIPTION_MAX_LENGTH} characters`,
  CARD_PRIORITY_INVALID: "Invalid priority selected",
  CARD_DATE_INVALID_FORMAT: "Date must be in valid format",
  CARD_DATE_IN_PAST: "Date cannot be in the past",
  PROJECT_NAME_REQUIRED: "Project name is required",
  PROJECT_NAME_EMPTY: "Project name cannot be empty",
  PROJECT_NAME_TOO_SHORT: `Project name must be at least ${VALIDATION.PROJECT_NAME_MIN_LENGTH} character`,
  PROJECT_NAME_TOO_LONG: `Project name cannot exceed ${VALIDATION.PROJECT_NAME_MAX_LENGTH} characters`,
  PROJECT_NAME_WHITESPACE: "Project name cannot be only whitespace",
  PROJECT_EXISTS: "A project with this name already exists",
  FORM_HAS_ERRORS: "Please fix the errors before submitting",
  REQUIRED_FIELD: "This field is required",
} as const;
