import { VALIDATION, VALIDATION_MESSAGES, PRIORITIES } from "@/constants";
import { Project, Priority, CardFormData, ValidationResult, CardValidationResult } from "@/types";

export const validateCardTitle = (title: string): ValidationResult => {
  if (!title || typeof title !== "string") {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_TITLE_REQUIRED,
    };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_TITLE_EMPTY,
    };
  }

  if (trimmedTitle.length < VALIDATION.CARD_TITLE_MIN_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_TITLE_TOO_SHORT,
    };
  }

  if (trimmedTitle.length > VALIDATION.CARD_TITLE_MAX_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_TITLE_TOO_LONG,
    };
  }

  return { isValid: true, error: null };
};

export const validateCardDescription = (description: string): ValidationResult => {
  if (!description) {
    return { isValid: true, error: null };
  }

  if (typeof description !== "string") {
    return {
      isValid: false,
      error: "Description must be a string",
    };
  }

  const trimmedDescription = description.trim();

  if (trimmedDescription.length > VALIDATION.CARD_DESCRIPTION_MAX_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_DESCRIPTION_TOO_LONG,
    };
  }

  return { isValid: true, error: null };
};

export const validateCardPriority = (priority: Priority | ""): ValidationResult => {
  if (priority === "") {
    return { isValid: true, error: null };
  }

  if (!PRIORITIES.includes(priority as Priority)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_PRIORITY_INVALID,
    };
  }

  return { isValid: true, error: null };
};

export const validateCardDate = (date: string): ValidationResult => {
  if (!date || date.trim() === "") {
    return { isValid: true, error: null };
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_DATE_INVALID_FORMAT,
    };
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_DATE_INVALID_FORMAT,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);

  if (dateObj < today) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.CARD_DATE_IN_PAST,
    };
  }

  return { isValid: true, error: null };
};

export const validateCardForm = (cardData: Partial<CardFormData>): CardValidationResult => {
  const errors: CardValidationResult["errors"] = {};

  const titleValidation = validateCardTitle(cardData.title || "");
  if (!titleValidation.isValid) {
    errors.title = titleValidation.error || undefined;
  }

  if (cardData.description) {
    const descriptionValidation = validateCardDescription(cardData.description);
    if (!descriptionValidation.isValid) {
      errors.description = descriptionValidation.error || undefined;
    }
  }

  if (cardData.priority !== undefined) {
    const priorityValidation = validateCardPriority(cardData.priority);
    if (!priorityValidation.isValid) {
      errors.priority = priorityValidation.error || undefined;
    }
  }

  if (cardData.date) {
    const dateValidation = validateCardDate(cardData.date);
    if (!dateValidation.isValid) {
      errors.date = dateValidation.error || undefined;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateProjectName = (projectName: string): ValidationResult => {
  if (!projectName || typeof projectName !== "string") {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.PROJECT_NAME_REQUIRED,
    };
  }

  const trimmedName = projectName.trim();

  if (trimmedName.length === 0) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.PROJECT_NAME_EMPTY,
    };
  }

  if (trimmedName.length < VALIDATION.PROJECT_NAME_MIN_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.PROJECT_NAME_TOO_SHORT,
    };
  }

  if (trimmedName.length > VALIDATION.PROJECT_NAME_MAX_LENGTH) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.PROJECT_NAME_TOO_LONG,
    };
  }

  return { isValid: true, error: null };
};

export const projectExists = (projectName: string, projectList: Project[]): boolean => {
  return projectList.some((project) => project.projectName.toLowerCase() === projectName.trim().toLowerCase());
};

export const sanitizeString = (input: string): string => {
  return input.trim().replace(/\s+/g, " ");
};

export const isOnlyWhitespace = (input: string): boolean => {
  return input.trim().length === 0;
};
