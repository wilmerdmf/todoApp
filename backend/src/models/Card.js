const mongoose = require("mongoose");
const VALIDATION_CONSTANTS = require("../config/validation.constants");

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [
        VALIDATION_CONSTANTS.CARD.TITLE_MAX_LENGTH,
        `Title cannot exceed ${VALIDATION_CONSTANTS.CARD.TITLE_MAX_LENGTH} characters`,
      ],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [
        VALIDATION_CONSTANTS.CARD.DESCRIPTION_MAX_LENGTH,
        `Description cannot exceed ${VALIDATION_CONSTANTS.CARD.DESCRIPTION_MAX_LENGTH} characters`,
      ],
      default: "",
    },
    priority: {
      type: String,
      enum: {
        values: VALIDATION_CONSTANTS.PRIORITY.VALID_VALUES,
        message: `Priority must be one of: ${VALIDATION_CONSTANTS.PRIORITY.VALID_VALUES.join(", ")}`,
      },
      default: VALIDATION_CONSTANTS.PRIORITY.DEFAULT,
    },
    date: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          if (!v || v === "") return true;
          return /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: "Date must be in format YYYY-MM-DD or empty",
      },
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

cardSchema.index({ userId: 1, order: 1 });

module.exports = mongoose.model("Card", cardSchema);
