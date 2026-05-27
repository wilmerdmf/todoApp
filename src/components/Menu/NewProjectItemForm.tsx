import { SquarePlus, SquareX } from "lucide-react";
import { VALIDATION } from "@/constants";
import { FormEvent, ChangeEvent } from "react";
import { FormErrors } from "@/types";

interface NewProjectItemFormProps {
  newProjectName: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onClose: (e: FormEvent) => void;
  isSubmitting: boolean;
  errors: FormErrors;
}

const NewProjectItemForm = ({
  newProjectName,
  onInput,
  onSubmit,
  onClose,
  isSubmitting,
  errors,
}: NewProjectItemFormProps) => {
  return (
    <form className="add-project-form" noValidate aria-label="New project form">
      <div className="project-input-wrapper input-container">
        <label htmlFor="new-project-name" className="visually-hidden">
          Project name
        </label>
        <input
          id="new-project-name"
          type="text"
          name="NewProject"
          value={newProjectName}
          onChange={onInput}
          minLength={VALIDATION.PROJECT_NAME_MIN_LENGTH}
          maxLength={VALIDATION.PROJECT_NAME_MAX_LENGTH}
          autoComplete="off"
          className={errors.projectName ? "input-error" : ""}
          aria-invalid={!!errors.projectName}
          aria-describedby={errors.projectName ? "project-name-error" : undefined}
          placeholder="Project name"
          required
        />

        {errors.projectName && (
          <span className="error-message" id="project-name-error" role="alert">
            {errors.projectName}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="project-form-add-button"
        onClick={onSubmit}
        disabled={isSubmitting}
        aria-label="Add project"
      >
        <SquarePlus size={18} color="#2ecc71" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="project-form-cancel-button"
        onClick={onClose}
        disabled={isSubmitting}
        aria-label="Cancel"
      >
        <SquareX size={18} color="#e74c3c" strokeWidth={1.5} aria-hidden="true" />
      </button>
    </form>
  );
};

export default NewProjectItemForm;
