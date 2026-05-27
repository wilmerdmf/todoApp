export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export interface CardValidationResult {
  isValid: boolean;
  errors: {
    title?: string;
    description?: string;
    priority?: string;
    date?: string;
  };
}

export interface FormErrors {
  [key: string]: string;
}
