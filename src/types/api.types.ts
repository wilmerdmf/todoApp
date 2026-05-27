import { Priority } from "./index";

export interface ProjectAPIResponse {
  _id: string;
  projectName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardAPIResponse {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  date: string;
  order: number;
  projectId:
    | {
        _id: string;
        projectName: string;
      }
    | string
    | null;
  createdAt: string;
  updatedAt: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
}

export interface APIErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string[] | string;
  };
}

export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INVALID_ID = "INVALID_ID",
  DATABASE_ERROR = "DATABASE_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  ROUTE_NOT_FOUND = "ROUTE_NOT_FOUND",
  DUPLICATE_KEY = "DUPLICATE_KEY",
}
