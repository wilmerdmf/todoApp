import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewCardForm from "@/components/NewCard/NewCardForm";
import * as useProjectsQueryHook from "@/hooks/useProjectsQuery";
import type { CardFormData, FormErrors } from "@/types";

const mockOnClose = vi.fn();
const mockOnChange = vi.fn();
const mockOnSubmit = vi.fn();

const defaultFormData: CardFormData = {
  id: "",
  title: "",
  description: "",
  priority: "",
  date: "",
  projectId: "",
};

const emptyErrors: FormErrors = {
  title: "",
  description: "",
  priority: "",
  date: "",
};

const defaultProps = {
  isFormOpen: true,
  projectCardData: defaultFormData,
  isSubmitting: false,
  errors: emptyErrors,
  hasErrors: false,
  onClose: mockOnClose,
  onChange: mockOnChange,
  onSubmit: mockOnSubmit,
};

const mockProjectsQuery = (projects: { id: string; projectName: string }[] = []) => {
  vi.spyOn(useProjectsQueryHook, "useProjectsQuery").mockReturnValue({
    projects,
    isLoading: false,
    isError: false,
    createProject: vi.fn(),
    isCreating: false,
    deleteProject: vi.fn(),
    isDeleting: false,
    deleteProjectWithCards: vi.fn(),
    isDeletingWithCards: false,
    deleteProjectAndUnassign: vi.fn(),
    isDeletingAndUnassigning: false,
  });
};
beforeEach(() => {
  vi.clearAllMocks();
  mockProjectsQuery();
});

describe("NewCardForm — rendering", () => {
  it("should render the title input", () => {
    render(<NewCardForm {...defaultProps} />);

    expect(screen.getByLabelText(/To-Do Title/i)).toBeInTheDocument();
  });

  it("should render the description textarea", () => {
    render(<NewCardForm {...defaultProps} />);

    expect(screen.getByLabelText(/To-Do Description/i)).toBeInTheDocument();
  });

  it("should render the priority select", () => {
    render(<NewCardForm {...defaultProps} />);

    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
  });

  it("should render the date input", () => {
    render(<NewCardForm {...defaultProps} />);

    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  });

  it("should render the project select", () => {
    render(<NewCardForm {...defaultProps} />);

    expect(screen.getByLabelText(/Project/i)).toBeInTheDocument();
  });

  it("should render 'New task' heading when id is empty", () => {
    render(<NewCardForm {...defaultProps} />);

    expect(screen.getByText("New task")).toBeInTheDocument();
  });

  it("should render 'Edit task' heading when id is present", () => {
    render(<NewCardForm {...defaultProps} projectCardData={{ ...defaultFormData, id: "card-1" }} />);

    expect(screen.getByText("Edit task")).toBeInTheDocument();
  });

  it("should render the submit button", () => {
    render(<NewCardForm {...defaultProps} />);

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should render projects in the project select", () => {
    mockProjectsQuery([
      { id: "p1", projectName: "Work" },
      { id: "p2", projectName: "Personal" },
    ]);

    render(<NewCardForm {...defaultProps} />);

    expect(screen.getByRole("option", { name: "Work" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Personal" })).toBeInTheDocument();
  });
});

describe("NewCardForm — form state", () => {
  it("should show the current title value", () => {
    render(<NewCardForm {...defaultProps} projectCardData={{ ...defaultFormData, title: "Fix bug" }} />);

    expect(screen.getByLabelText(/To-Do Title/i)).toHaveValue("Fix bug");
  });

  it("should disable the submit button when isSubmitting is true", () => {
    render(<NewCardForm {...defaultProps} isSubmitting={true} />);

    expect(screen.getByRole("button", { name: /submitting/i })).toBeDisabled();
  });

  it("should show 'Submitting...' text when isSubmitting is true", () => {
    render(<NewCardForm {...defaultProps} isSubmitting={true} />);

    expect(screen.getByText("Submitting...")).toBeInTheDocument();
  });
});

describe("NewCardForm — errors", () => {
  it("should show title error message", () => {
    render(<NewCardForm {...defaultProps} errors={{ ...emptyErrors, title: "Title is required" }} />);

    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });

  it("should mark title input as invalid when there is an error", () => {
    render(<NewCardForm {...defaultProps} errors={{ ...emptyErrors, title: "Title is required" }} />);

    expect(screen.getByLabelText(/To-Do Title/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("should show the form error summary when hasErrors is true", () => {
    render(<NewCardForm {...defaultProps} hasErrors={true} />);

    expect(screen.getByText("Please fix the errors above before submitting")).toBeInTheDocument();
  });

  it("should not show the form error summary when hasErrors is false", () => {
    render(<NewCardForm {...defaultProps} hasErrors={false} />);

    expect(screen.queryByText("Please fix the errors above before submitting")).not.toBeInTheDocument();
  });
});

describe("NewCardForm — interactions", () => {
  it("should call onClose when close button is clicked", async () => {
    render(<NewCardForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText("Close form"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onChange when typing in the title input", async () => {
    render(<NewCardForm {...defaultProps} />);

    await userEvent.type(screen.getByLabelText(/To-Do Title/i), "New task");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should call onSubmit when the form is submitted", async () => {
    render(<NewCardForm {...defaultProps} />);

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should call onClose when Escape key is pressed", async () => {
    render(<NewCardForm {...defaultProps} />);

    await userEvent.keyboard("{Escape}");

    expect(mockOnClose).toHaveBeenCalled();
  });
});
