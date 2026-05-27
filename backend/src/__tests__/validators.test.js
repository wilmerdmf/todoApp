const { validateObjectId, validateCard, validateProjectName } = require("../utils/validators");
const { ValidationError, InvalidIdError } = require("../utils/errors");

describe("validateObjectId", () => {
  it("should not throw for a valid MongoDB ObjectId", () => {
    expect(() => validateObjectId("64a1f2c3b4d5e6f7a8b9c0d1")).not.toThrow();
  });

  it("should throw InvalidIdError for an invalid id", () => {
    expect(() => validateObjectId("invalid-id")).toThrow(InvalidIdError);
  });

  it("should throw InvalidIdError for an empty string", () => {
    expect(() => validateObjectId("")).toThrow(InvalidIdError);
  });

  it("should throw InvalidIdError for a number", () => {
    expect(() => validateObjectId("12345")).toThrow(InvalidIdError);
  });

  it("should return true for a valid ObjectId", () => {
    const result = validateObjectId("64a1f2c3b4d5e6f7a8b9c0d1");
    expect(result).toBe(true);
  });
});

describe("validateCard", () => {
  const validCard = {
    title: "Fix bug",
    description: "Login is broken",
    priority: "Chill",
    date: "2030-12-31",
  };

  it("should not throw for a valid card", () => {
    expect(() => validateCard(validCard)).not.toThrow();
  });

  it("should return isValid true for a valid card", () => {
    const result = validateCard(validCard);
    expect(result.isValid).toBe(true);
  });

  it("should throw ValidationError when title is missing", () => {
    expect(() => validateCard({ ...validCard, title: "" })).toThrow(ValidationError);
  });

  it("should throw ValidationError when title is only whitespace", () => {
    expect(() => validateCard({ ...validCard, title: "   " })).toThrow(ValidationError);
  });

  it("should throw ValidationError when title exceeds 22 characters", () => {
    const longTitle = "a".repeat(23);
    expect(() => validateCard({ ...validCard, title: longTitle })).toThrow(ValidationError);
  });

  it("should throw ValidationError when description exceeds 80 characters", () => {
    const longDescription = "a".repeat(81);
    expect(() => validateCard({ ...validCard, description: longDescription })).toThrow(ValidationError);
  });

  it("should throw ValidationError for an invalid priority", () => {
    expect(() => validateCard({ ...validCard, priority: "urgent" })).toThrow(ValidationError);
  });

  it("should accept all valid priority values", () => {
    expect(() => validateCard({ ...validCard, priority: "Chill" })).not.toThrow();
    expect(() => validateCard({ ...validCard, priority: "Medium" })).not.toThrow();
    expect(() => validateCard({ ...validCard, priority: "Important" })).not.toThrow();
  });

  it("should not throw when priority is not provided", () => {
    const { priority, ...cardWithoutPriority } = validCard;
    expect(() => validateCard(cardWithoutPriority)).not.toThrow();
  });

  it("should throw ValidationError for a date with wrong format", () => {
    expect(() => validateCard({ ...validCard, date: "31/12/2030" })).toThrow(ValidationError);
  });

  it("should throw ValidationError for an invalid date", () => {
    expect(() => validateCard({ ...validCard, date: "2030-13-99" })).toThrow(ValidationError);
  });

  it("should not throw when date is an empty string", () => {
    expect(() => validateCard({ ...validCard, date: "" })).not.toThrow();
  });

  it("should not throw when date is not provided", () => {
    const { date, ...cardWithoutDate } = validCard;
    expect(() => validateCard(cardWithoutDate)).not.toThrow();
  });
});

describe("validateProjectName", () => {
  it("should not throw for a valid project name", () => {
    expect(() => validateProjectName("My Project")).not.toThrow();
  });

  it("should return isValid true and trimmedName for a valid name", () => {
    const result = validateProjectName("  My Project  ");
    expect(result.isValid).toBe(true);
    expect(result.trimmedName).toBe("My Project");
  });

  it("should throw ValidationError when name is empty", () => {
    expect(() => validateProjectName("")).toThrow(ValidationError);
  });

  it("should throw ValidationError when name is only whitespace", () => {
    expect(() => validateProjectName("   ")).toThrow(ValidationError);
  });

  it("should throw ValidationError when name exceeds 15 characters", () => {
    const longName = "a".repeat(16);
    expect(() => validateProjectName(longName)).toThrow(ValidationError);
  });

  it("should throw ValidationError when name is null", () => {
    expect(() => validateProjectName(null)).toThrow(ValidationError);
  });
});
