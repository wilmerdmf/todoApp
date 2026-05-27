class AppError extends Error {
  constructor(message, statusCode, errorCode = null, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation failed", details = null) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

class NotFoundError extends AppError {
  constructor(resource = "Resource", id = null) {
    const message = id ? `${resource} with id '${id}' not found` : `${resource} not found`;
    super(message, 404, "NOT_FOUND");
  }
}

class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, 409, "CONFLICT");
  }
}

class InvalidIdError extends AppError {
  constructor(id) {
    super(`Invalid ID format: '${id}'`, 422, "INVALID_ID");
  }
}

class DatabaseError extends AppError {
  constructor(message = "Database operation failed", originalError = null) {
    super(message, 500, "DATABASE_ERROR", originalError?.message);
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  ConflictError,
  InvalidIdError,
  DatabaseError,
};
