import { useEffect } from "react";
import { ChevronDown, SquarePlus } from "lucide-react";
import { VALIDATION, DATE_FORMATS } from "@/constants";
import { useProjectsQuery, useFocusTrap } from "@/hooks";
import { getTodayInput } from "@/utils";
import { CardFormData } from "@/types";
import { FormErrors } from "@/types";

interface NewCardFormProps {
  isFormOpen: boolean;
  projectCardData: CardFormData;
  isSubmitting: boolean;
  errors: FormErrors;
  hasErrors: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const NewCardForm = ({
  isFormOpen,
  projectCardData,
  isSubmitting,
  errors,
  hasErrors,
  onClose,
  onChange,
  onSubmit,
}: NewCardFormProps) => {
  const { projects } = useProjectsQuery();

  const containerRef = useFocusTrap(isFormOpen);

  useEffect(() => {
    if (isFormOpen) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  }, [isFormOpen]);

  useEffect(() => {
    if (!isFormOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFormOpen, onClose]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <section
      ref={containerRef}
      className={`add-todo-menu-container ${isFormOpen ? "is-active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-form-title"
      aria-hidden={undefined}
    >
      <button className="close-todo-menu" onClick={onClose} type="button" aria-label="Close form">
        <ChevronDown size={26} color="#e6edf3" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <form className="add-todo-form" onSubmit={handleSubmit} noValidate>
        <h2 id="card-form-title" className="visually-hidden">
          {projectCardData.id ? "Edit task" : "New task"}
        </h2>

        <div className="input-container">
          <label htmlFor="toDo-title">
            To-Do Title:{" "}
            <span className="required-asterisk" aria-hidden="true">
              *
            </span>
          </label>

          <input
            type="text"
            id="toDo-title"
            name="title"
            placeholder="Title"
            maxLength={VALIDATION.CARD_TITLE_MAX_LENGTH}
            onChange={onChange}
            value={projectCardData.title}
            className={errors.title ? "input-error" : ""}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
            aria-required="true"
            required
          />

          {errors.title && (
            <span className="error-message" id="title-error" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="toDo-description">To-Do Description:</label>

          <textarea
            id="toDo-description"
            name="description"
            placeholder="Description"
            maxLength={VALIDATION.CARD_DESCRIPTION_MAX_LENGTH}
            onChange={onChange}
            value={projectCardData.description}
            className={errors.description ? "input-error" : ""}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
          />

          {errors.description && (
            <span className="error-message" id="description-error" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="toDo-priority">Priority:</label>

          <select
            id="toDo-priority"
            name="priority"
            onChange={onChange}
            value={projectCardData.priority}
            className={errors.priority ? "input-error" : ""}
            aria-invalid={!!errors.priority}
            aria-describedby={errors.priority ? "priority-error" : undefined}
          >
            <option value="">Choose Priority</option>
            <option value="Chill">Chill (Default)</option>
            <option value="Medium">Medium</option>
            <option value="Important">Important</option>
          </select>

          {errors.priority && (
            <span className="error-message" id="priority-error" role="alert">
              {errors.priority}
            </span>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="toDo-date">Date: {DATE_FORMATS.DISPLAY} (Optional)</label>

          <input
            type="date"
            id="toDo-date"
            name="date"
            onChange={onChange}
            value={projectCardData.date}
            min={getTodayInput()}
            className={errors.date ? "input-error" : ""}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
          />

          <small className="date-helper">Leave empty for no specific date</small>

          {errors.date && (
            <span className="error-message" id="date-error" role="alert">
              {errors.date}
            </span>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="toDo-project">Project:</label>

          <select id="toDo-project" name="projectId" onChange={onChange} value={projectCardData.projectId || ""}>
            <option value="">No project</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>

        <div className="send-todo-container">
          <button type="submit" className="send-todo-button" disabled={isSubmitting}>
            <SquarePlus size={18} color="#2ecc71" strokeWidth={1.5} aria-hidden="true" />
            <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
          </button>
        </div>

        {hasErrors && (
          <div className="form-errors-summary" role="alert">
            Please fix the errors above before submitting
          </div>
        )}
      </form>
    </section>
  );
};

export default NewCardForm;
