export const NOTIFICATION_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
} as const;

export const NOTIFICATION_MESSAGES = {
  PROJECT_CREATED: "Project created successfully",
  PROJECT_DELETED: "Project deleted successfully",
  PROJECT_CREATE_ERROR: "Failed to create project",
  PROJECT_DELETE_ERROR: "Failed to delete project",
  PROJECT_EXISTS: "Project already exists",
  PROJECTS_FETCH_ERROR: "Failed to load projects from server",
  CARD_CREATED: "Card created successfully",
  CARD_UPDATED: "Card updated successfully",
  CARD_DELETED: "Card deleted successfully",
  CARD_CREATE_ERROR: "Failed to create card",
  CARD_UPDATE_ERROR: "Failed to update card",
  CARD_DELETE_ERROR: "Failed to delete card",
  CARDS_FETCH_ERROR: "Failed to load cards from server",
  LOAD_DATA_ERROR: "Failed to load data from server",
  INVALID_INPUT: "Please check your input",
} as const;
