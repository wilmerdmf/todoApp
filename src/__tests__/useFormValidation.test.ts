import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFormValidation } from "@/hooks/useFormValidation";

describe("useFormValidation", () => {
  it("should initialize with empty errors", () => {
    const { result } = renderHook(() => useFormValidation());

    expect(result.current.errors).toEqual({});
    expect(result.current.hasErrors).toBe(false);
  });

  describe("setError", () => {
    it("should set an error for a field", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Title is required");
      });

      expect(result.current.errors.title).toBe("Title is required");
      expect(result.current.hasErrors).toBe(true);
    });

    it("should set errors for multiple fields independently", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Title is required");
        result.current.setError("description", "Description is too long");
      });

      expect(result.current.errors.title).toBe("Title is required");
      expect(result.current.errors.description).toBe("Description is too long");
    });

    it("should overwrite an existing error for the same field", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "First error");
      });

      act(() => {
        result.current.setError("title", "Second error");
      });

      expect(result.current.errors.title).toBe("Second error");
    });
  });

  describe("clearError", () => {
    it("should clear the error for a specific field", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Title is required");
        result.current.setError("description", "Too long");
      });

      act(() => {
        result.current.clearError("title");
      });

      expect(result.current.errors.title).toBeUndefined();
      expect(result.current.errors.description).toBe("Too long");
    });

    it("should not affect other fields when clearing one", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Title is required");
        result.current.setError("date", "Invalid date");
      });

      act(() => {
        result.current.clearError("title");
      });

      expect(result.current.errors.date).toBe("Invalid date");
      expect(result.current.hasErrors).toBe(true);
    });

    it("should set hasErrors to false when last error is cleared", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Title is required");
      });

      act(() => {
        result.current.clearError("title");
      });

      expect(result.current.hasErrors).toBe(false);
    });
  });

  describe("clearAllErrors", () => {
    it("should clear all errors at once", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Title is required");
        result.current.setError("description", "Too long");
        result.current.setError("date", "Invalid date");
      });

      act(() => {
        result.current.clearAllErrors();
      });

      expect(result.current.errors).toEqual({});
      expect(result.current.hasErrors).toBe(false);
    });

    it("should not throw when called with no errors", () => {
      const { result } = renderHook(() => useFormValidation());

      expect(() => {
        act(() => {
          result.current.clearAllErrors();
        });
      }).not.toThrow();
    });
  });

  describe("getError", () => {
    it("should return the error message for a field with an error", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Title is required");
      });

      expect(result.current.getError("title")).toBe("Title is required");
    });

    it("should return undefined for a field without an error", () => {
      const { result } = renderHook(() => useFormValidation());

      expect(result.current.getError("title")).toBeUndefined();
    });
  });

  describe("setErrors", () => {
    it("should replace all errors with the new errors object", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Old error");
      });

      act(() => {
        result.current.setErrors({ description: "New error" });
      });

      expect(result.current.errors.title).toBeUndefined();
      expect(result.current.errors.description).toBe("New error");
    });

    it("should set hasErrors to true when setting non-empty errors", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setErrors({ title: "Title is required" });
      });

      expect(result.current.hasErrors).toBe(true);
    });

    it("should set hasErrors to false when setting empty errors object", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.setError("title", "Title is required");
      });

      act(() => {
        result.current.setErrors({});
      });

      expect(result.current.hasErrors).toBe(false);
    });
  });
});
