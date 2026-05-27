const {
  AppError,
  ValidationError,
  NotFoundError,
  ConflictError,
  InvalidIdError,
  DatabaseError,
} = require("../utils/errors");

describe("AppError", () => {
  it("should create an error with the correct properties", () => {
    const error = new AppError("Something went wrong", 500, "SERVER_ERROR");

    expect(error.message).toBe("Something went wrong");
    expect(error.statusCode).toBe(500);
    expect(error.errorCode).toBe("SERVER_ERROR");
    expect(error.isOperational).toBe(true);
    expect(error).toBeInstanceOf(Error);
  });

  it("should default errorCode and details to null", () => {
    const error = new AppError("Error", 400);

    expect(error.errorCode).toBeNull();
    expect(error.details).toBeNull();
  });
});

describe("ValidationError", () => {
  it("should create a 400 error with VALIDATION_ERROR code", () => {
    const error = new ValidationError("Validation failed");

    expect(error.statusCode).toBe(400);
    expect(error.errorCode).toBe("VALIDATION_ERROR");
    expect(error.message).toBe("Validation failed");
  });

  it("should use default message when none is provided", () => {
    const error = new ValidationError();

    expect(error.message).toBe("Validation failed");
  });

  it("should store details when provided", () => {
    const details = ["Title is required", "Date is invalid"];
    const error = new ValidationError("Validation failed", details);

    expect(error.details).toEqual(details);
  });
});

describe("NotFoundError", () => {
  it("should create a 404 error with resource name", () => {
    const error = new NotFoundError("Project");

    expect(error.statusCode).toBe(404);
    expect(error.errorCode).toBe("NOT_FOUND");
    expect(error.message).toBe("Project not found");
  });

  it("should include the id in the message when provided", () => {
    const error = new NotFoundError("Card", "abc123");

    expect(error.message).toBe("Card with id 'abc123' not found");
  });

  it("should use default resource name when none provided", () => {
    const error = new NotFoundError();

    expect(error.message).toBe("Resource not found");
  });
});

describe("ConflictError", () => {
  it("should create a 409 error", () => {
    const error = new ConflictError("Email already in use");

    expect(error.statusCode).toBe(409);
    expect(error.errorCode).toBe("CONFLICT");
    expect(error.message).toBe("Email already in use");
  });

  it("should use default message when none is provided", () => {
    const error = new ConflictError();

    expect(error.message).toBe("Resource already exists");
  });
});

describe("InvalidIdError", () => {
  it("should create a 422 error with the invalid id in the message", () => {
    const error = new InvalidIdError("not-a-valid-id");

    expect(error.statusCode).toBe(422);
    expect(error.errorCode).toBe("INVALID_ID");
    expect(error.message).toBe("Invalid ID format: 'not-a-valid-id'");
  });
});

describe("DatabaseError", () => {
  it("should create a 500 error", () => {
    const error = new DatabaseError("Database operation failed");

    expect(error.statusCode).toBe(500);
    expect(error.errorCode).toBe("DATABASE_ERROR");
    expect(error.message).toBe("Database operation failed");
  });

  it("should use default message when none is provided", () => {
    const error = new DatabaseError();

    expect(error.message).toBe("Database operation failed");
  });

  it("should store original error message in details", () => {
    const originalError = new Error("Connection timeout");
    const error = new DatabaseError("Database operation failed", originalError);

    expect(error.details).toBe("Connection timeout");
  });
});
