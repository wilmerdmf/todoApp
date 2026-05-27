const mongoose = require("mongoose");
const VALIDATION_CONSTANTS = require("../config/validation.constants");
const { ValidationError, InvalidIdError } = require("./errors");

const validateObjectId = (id, fieldName = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidIdError(id);
  }
  return true;
};

const validateCard = (cardData) => {
  const errors = [];
  const { title, description, priority, date } = cardData;

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  } else if (title.length > VALIDATION_CONSTANTS.CARD.TITLE_MAX_LENGTH) {
    errors.push(`Title cannot exceed ${VALIDATION_CONSTANTS.CARD.TITLE_MAX_LENGTH} characters`);
  }

  if (description && description.length > VALIDATION_CONSTANTS.CARD.DESCRIPTION_MAX_LENGTH) {
    errors.push(`Description cannot exceed ${VALIDATION_CONSTANTS.CARD.DESCRIPTION_MAX_LENGTH} characters`);
  }

  if (priority && !VALIDATION_CONSTANTS.PRIORITY.VALID_VALUES.includes(priority)) {
    errors.push(`Priority must be one of: ${VALIDATION_CONSTANTS.PRIORITY.VALID_VALUES.join(", ")}`);
  }

  if (date && date !== "") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push("Date must be in format YYYY-MM-DD or empty");
    } else {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        errors.push("Date must be a valid date");
      }
    }
  }

  if (errors.length > 0) {
    throw new ValidationError("Card validation failed", errors);
  }

  return { isValid: true };
};

const validateProjectName = (projectName) => {
  if (!projectName || projectName.trim().length === 0) {
    throw new ValidationError("Project name is required");
  }

  const trimmedName = projectName.trim();

  if (trimmedName.length < VALIDATION_CONSTANTS.PROJECT.NAME_MIN_LENGTH) {
    throw new ValidationError(
      `Project name must be at least ${VALIDATION_CONSTANTS.PROJECT.NAME_MIN_LENGTH} character`,
    );
  }

  if (trimmedName.length > VALIDATION_CONSTANTS.PROJECT.NAME_MAX_LENGTH) {
    throw new ValidationError(`Project name cannot exceed ${VALIDATION_CONSTANTS.PROJECT.NAME_MAX_LENGTH} characters`);
  }

  return { isValid: true, trimmedName };
};

module.exports = {
  validateObjectId,
  validateCard,
  validateProjectName,
};
