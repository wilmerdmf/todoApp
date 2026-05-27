import { useState, useCallback } from "react";
import { FormErrors, UseFormValidationReturn } from "@/types";

export const useFormValidation = (): UseFormValidationReturn => {
  const [errors, setErrorsState] = useState<FormErrors>({});

  const setError = useCallback((field: string, message: string) => {
    setErrorsState((prev) => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const clearError = useCallback((field: string) => {
    setErrorsState((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrorsState({});
  }, []);

  const getError = useCallback(
    (field: string): string | undefined => {
      return errors[field];
    },
    [errors],
  );

  const setErrors = useCallback((newErrors: FormErrors) => {
    setErrorsState(newErrors);
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
    hasErrors,
    getError,
    setErrors,
  };
};
