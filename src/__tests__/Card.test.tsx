import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "@/components/ProjectCards/Card";
import * as useSetProjectHook from "@/hooks/useSetProject";
import * as useUIContextHook from "@/hooks/useUIContext";
import type { Card as CardType } from "@/types";

const mockUiDispatch = vi.fn();

const mockCard: CardType = {
  id: "card-1",
  title: "Fix login bug",
  description: "The login form is broken",
  priority: "Important",
  date: "2030-12-31",
  projectId: "proj-1",
  order: 0,
};

beforeEach(() => {
  vi.clearAllMocks();

  vi.spyOn(useUIContextHook, "default").mockReturnValue({
    uiDispatch: mockUiDispatch,
    isMenuOpen: false,
    activeMenuOption: "home",
    deleteProjectModal: null,
    deleteCardModal: null,
    isLogoutModalOpen: false,
    searchQuery: "",
    priorityFilter: "",
  });

  vi.spyOn(useSetProjectHook, "default").mockReturnValue({
    currentProject: "My Project",
  });
});

describe("Card", () => {
  it("should render the card title", () => {
    render(<Card card={mockCard} onEdit={vi.fn()} />);

    expect(screen.getByText("Fix login bug")).toBeInTheDocument();
  });

  it("should render the card description", () => {
    render(<Card card={mockCard} onEdit={vi.fn()} />);

    expect(screen.getByText("The login form is broken")).toBeInTheDocument();
  });

  it("should render the card priority", () => {
    render(<Card card={mockCard} onEdit={vi.fn()} />);

    expect(screen.getByText("Important")).toBeInTheDocument();
  });

  it("should render the project name", () => {
    render(<Card card={mockCard} onEdit={vi.fn()} />);

    expect(screen.getByText("My Project")).toBeInTheDocument();
  });

  it("should render 'No project' when card has no project assigned", () => {
    vi.spyOn(useSetProjectHook, "default").mockReturnValue({
      currentProject: "No project",
    });

    render(<Card card={{ ...mockCard, projectId: "" }} onEdit={vi.fn()} />);

    expect(screen.getByText("No project")).toBeInTheDocument();
  });

  it("should call onEdit when the card is clicked", async () => {
    const onEdit = vi.fn();
    render(<Card card={mockCard} onEdit={onEdit} />);

    await userEvent.click(screen.getByRole("article"));

    expect(onEdit).toHaveBeenCalledWith(mockCard);
  });

  it("should render the delete button", () => {
    render(<Card card={mockCard} onEdit={vi.fn()} />);

    expect(screen.getByLabelText("Delete card")).toBeInTheDocument();
  });

  it("should dispatch delete modal action when delete button is clicked", async () => {
    render(<Card card={mockCard} onEdit={vi.fn()} />);

    await userEvent.click(screen.getByLabelText("Delete card"));

    expect(mockUiDispatch).toHaveBeenCalled();
  });

  it("should not call onEdit when delete button is clicked", async () => {
    const onEdit = vi.fn();
    render(<Card card={mockCard} onEdit={onEdit} />);

    await userEvent.click(screen.getByLabelText("Delete card"));

    expect(onEdit).not.toHaveBeenCalled();
  });

  it("should set data-meta-prio attribute with the priority value", () => {
    render(<Card card={mockCard} onEdit={vi.fn()} />);

    expect(screen.getByRole("article")).toHaveAttribute("data-meta-prio", "Important");
  });
});
