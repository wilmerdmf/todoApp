const VALIDATION_CONSTANTS = {
  CARD: {
    TITLE_MIN_LENGTH: 1,
    TITLE_MAX_LENGTH: 22,
    DESCRIPTION_MAX_LENGTH: 80,
  },

  PROJECT: {
    NAME_MIN_LENGTH: 1,
    NAME_MAX_LENGTH: 15,
  },

  PRIORITY: {
    VALID_VALUES: ["Chill", "Medium", "Important"],
    DEFAULT: "Chill",
  },

  DATE: {
    FORMAT_DISPLAY: "MM/DD/YYYY",
    FORMAT_INPUT: "YYYY-MM-DD",
    MIN_YEAR: 2000,
    MAX_YEAR: 2100,
    EMPTY_VALUE: "",
  },
};

module.exports = VALIDATION_CONSTANTS;
