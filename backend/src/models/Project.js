const mongoose = require("mongoose");
const VALIDATION_CONSTANTS = require("../config/validation.constants");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minLength: [
        VALIDATION_CONSTANTS.PROJECT.NAME_MIN_LENGTH,
        `Project name must be at least ${VALIDATION_CONSTANTS.PROJECT.NAME_MIN_LENGTH} character`,
      ],
      maxLength: [
        VALIDATION_CONSTANTS.PROJECT.NAME_MAX_LENGTH,
        `Project name cannot exceed ${VALIDATION_CONSTANTS.PROJECT.NAME_MAX_LENGTH} characters`,
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
