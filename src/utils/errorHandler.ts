import { AxiosError } from "axios";
import { APIErrorResponse, ErrorCode } from "@/types/api.types";

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: string[] | string;
  statusCode?: number;
}

export const parseAPIError = (error: unknown): AppError => {
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError<APIErrorResponse>;

    if (!axiosError.response) {
      if (axiosError.code === "ECONNABORTED") {
        return {
          code: ErrorCode.TIMEOUT_ERROR,
          message: "Request timeout. Please check your connection and try again.",
          statusCode: 408,
        };
      }

      return {
        code: ErrorCode.NETWORK_ERROR,
        message: "Unable to connect to server. Please check your internet connection.",
        statusCode: 0,
      };
    }

    const { data, status } = axiosError.response;

    if (data?.error) {
      return {
        code: data.error.code as ErrorCode,
        message: data.error.message,
        details: data.error.details,
        statusCode: status,
      };
    }

    return {
      code: ErrorCode.INTERNAL_ERROR,
      message: axiosError.message || "An unexpected error occurred",
      statusCode: status,
    };
  }

  if (error instanceof Error) {
    return {
      code: ErrorCode.INTERNAL_ERROR,
      message: error.message,
    };
  }

  return {
    code: ErrorCode.INTERNAL_ERROR,
    message: "An unknown error occurred",
  };
};

export const getUserFriendlyMessage = (error: AppError): string => {
  const messages: Record<ErrorCode, string> = {
    [ErrorCode.VALIDATION_ERROR]: "Please check your input and try again.",
    [ErrorCode.NOT_FOUND]: "The requested item could not be found.",
    [ErrorCode.CONFLICT]: "This item already exists.",
    [ErrorCode.INVALID_ID]: "Invalid ID provided.",
    [ErrorCode.DATABASE_ERROR]: "A server error occurred. Please try again later.",
    [ErrorCode.NETWORK_ERROR]: "Network error. Please check your connection.",
    [ErrorCode.TIMEOUT_ERROR]: "Request timed out. Please try again.",
    [ErrorCode.INTERNAL_ERROR]: "An unexpected error occurred.",
    [ErrorCode.ROUTE_NOT_FOUND]: "API endpoint not found.",
    [ErrorCode.DUPLICATE_KEY]: "This item already exists.",
  };

  return error.message || messages[error.code] || "An error occurred";
};

export const formatErrorDetails = (details?: string[] | string): string | null => {
  if (!details) return null;

  if (Array.isArray(details)) {
    return details.join(", ");
  }

  return details;
};

export const isErrorType = (error: AppError, code: ErrorCode): boolean => {
  return error.code === code;
};

export const logError = (error: AppError, context?: string): void => {
  if (import.meta.env.DEV) {
    console.group(`🔴 Error ${context ? `in ${context}` : ""}`);
    console.error("Code:", error.code);
    console.error("Message:", error.message);
    if (error.details) {
      console.error("Details:", error.details);
    }
    if (error.statusCode) {
      console.error("Status Code:", error.statusCode);
    }
    console.groupEnd();
  }
};

export const handleError = (error: unknown, fallbackMessage: string): void => {
  const appError = parseAPIError(error);
  logError(appError, fallbackMessage);
};

export const getErrorMessage = (error: unknown): string => {
  const appError = parseAPIError(error);
  return getUserFriendlyMessage(appError);
};
