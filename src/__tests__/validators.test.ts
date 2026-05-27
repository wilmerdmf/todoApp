import { describe, it, expect } from "vitest";
import {
  validateCardTitle,
  validateCardDescription,
  validateCardPriority,
  validateCardDate,
  validateCardForm,
  validateProjectName,
  projectExists,
  sanitizeString,
  isOnlyWhitespace,
} from "@/utils/validators";
import { VALIDATION_MESSAGES } from "@/constants";
import type { Project } from "@/types";

describe("validateCardTitle", () => {
  it("should return isValid true for a valid title", () => {
    const result = validateCardTitle("Fix bug");
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("should return error when title is empty string", () => {
    const result = validateCardTitle("");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.CARD_TITLE_REQUIRED);
  });

  it("should return error when title is only whitespace", () => {
    const result = validateCardTitle("   ");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.CARD_TITLE_EMPTY);
  });

  it("should return error when title exceeds 22 characters", () => {
    const result = validateCardTitle("a".repeat(23));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.CARD_TITLE_TOO_LONG);
  });

  it("should return isValid true for a title of exactly 22 characters", () => {
    const result = validateCardTitle("a".repeat(22));
    expect(result.isValid).toBe(true);
  });
});

describe("validateCardDescription", () => {
  it("should return isValid true for a valid description", () => {
    const result = validateCardDescription("This is a description");
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("should return isValid true when description is empty (optional field)", () => {
    const result = validateCardDescription("");
    expect(result.isValid).toBe(true);
  });

  it("should return error when description exceeds 80 characters", () => {
    const result = validateCardDescription("a".repeat(81));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.CARD_DESCRIPTION_TOO_LONG);
  });

  it("should return isValid true for a description of exactly 80 characters", () => {
    const result = validateCardDescription("a".repeat(80));
    expect(result.isValid).toBe(true);
  });
});

describe("validateCardPriority", () => {
  it("should return isValid true for Chill", () => {
    const result = validateCardPriority("Chill");
    expect(result.isValid).toBe(true);
  });

  it("should return isValid true for Medium", () => {
    const result = validateCardPriority("Medium");
    expect(result.isValid).toBe(true);
  });

  it("should return isValid true for Important", () => {
    const result = validateCardPriority("Important");
    expect(result.isValid).toBe(true);
  });

  it("should return isValid true for empty string (optional field)", () => {
    const result = validateCardPriority("");
    expect(result.isValid).toBe(true);
  });

  it("should return error for an invalid priority", () => {
    const result = validateCardPriority("urgent" as any);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.CARD_PRIORITY_INVALID);
  });
});

describe("validateCardDate", () => {
  it("should return isValid true for a valid future date", () => {
    const result = validateCardDate("2030-12-31");
    expect(result.isValid).toBe(true);
  });

  it("should return isValid true when date is empty (optional field)", () => {
    const result = validateCardDate("");
    expect(result.isValid).toBe(true);
  });

  it("should return error for a date in the past", () => {
    const result = validateCardDate("2000-01-01");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.CARD_DATE_IN_PAST);
  });

  it("should return error for a date with wrong format", () => {
    const result = validateCardDate("31/12/2030");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.CARD_DATE_INVALID_FORMAT);
  });

  it("should return error for a completely invalid date", () => {
    const result = validateCardDate("not-a-date");
    expect(result.isValid).toBe(false);
  });
});

describe("validateCardForm", () => {
  it("should return isValid true for a complete valid form", () => {
    const result = validateCardForm({
      title: "Fix bug",
      description: "Details here",
      priority: "Chill",
      date: "2030-12-31",
    });
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("should return isValid true with only title (all other fields optional)", () => {
    const result = validateCardForm({ title: "Fix bug" });
    expect(result.isValid).toBe(true);
  });

  it("should return errors when title is missing", () => {
    const result = validateCardForm({ title: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBeDefined();
  });

  it("should return multiple errors when multiple fields are invalid", () => {
    const result = validateCardForm({
      title: "",
      description: "a".repeat(81),
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBeDefined();
    expect(result.errors.description).toBeDefined();
  });
});

describe("validateProjectName", () => {
  it("should return isValid true for a valid project name", () => {
    const result = validateProjectName("My Project");
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("should return error when name is empty", () => {
    const result = validateProjectName("");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.PROJECT_NAME_REQUIRED);
  });

  it("should return error when name is only whitespace", () => {
    const result = validateProjectName("   ");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.PROJECT_NAME_EMPTY);
  });

  it("should return error when name exceeds 15 characters", () => {
    const result = validateProjectName("a".repeat(16));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(VALIDATION_MESSAGES.PROJECT_NAME_TOO_LONG);
  });

  it("should return isValid true for a name of exactly 15 characters", () => {
    const result = validateProjectName("a".repeat(15));
    expect(result.isValid).toBe(true);
  });
});

describe("projectExists", () => {
  const projects: Project[] = [
    { id: "1", projectName: "Work" },
    { id: "2", projectName: "Personal" },
  ];

  it("should return true when project exists (case-insensitive)", () => {
    expect(projectExists("work", projects)).toBe(true);
    expect(projectExists("WORK", projects)).toBe(true);
    expect(projectExists("Work", projects)).toBe(true);
  });

  it("should return false when project does not exist", () => {
    expect(projectExists("Shopping", projects)).toBe(false);
  });

  it("should return false for an empty list", () => {
    expect(projectExists("Work", [])).toBe(false);
  });
});

describe("sanitizeString", () => {
  it("should trim leading and trailing whitespace", () => {
    expect(sanitizeString("  hello  ")).toBe("hello");
  });

  it("should replace multiple spaces with a single space", () => {
    expect(sanitizeString("hello   world")).toBe("hello world");
  });

  it("should handle already clean strings", () => {
    expect(sanitizeString("hello world")).toBe("hello world");
  });
});

describe("isOnlyWhitespace", () => {
  it("should return true for a string of only spaces", () => {
    expect(isOnlyWhitespace("   ")).toBe(true);
  });

  it("should return true for an empty string", () => {
    expect(isOnlyWhitespace("")).toBe(true);
  });

  it("should return false for a string with content", () => {
    expect(isOnlyWhitespace("hello")).toBe(false);
  });

  it("should return false for a string with content and spaces", () => {
    expect(isOnlyWhitespace("  hello  ")).toBe(false);
  });
});
