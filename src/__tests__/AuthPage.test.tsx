import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthPage from "@/components/common/AuthPage";
import * as useAuthHook from "@/hooks/useAuth";

const mockUseAuth = {
  isLoginMode: true,
  isAuthLoading: false,
  formData: { name: "", email: "", password: "" },
  showPassword: false,
  handleChange: vi.fn(),
  handleSubmit: vi.fn(),
  handleToggleMode: vi.fn(),
  handleTogglePassword: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(useAuthHook, "default").mockReturnValue(mockUseAuth);
});

describe("AuthPage — login mode", () => {
  it("should render the login heading", () => {
    render(<AuthPage />);

    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  it("should render email and password fields", () => {
    render(<AuthPage />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("should not render the name field in login mode", () => {
    render(<AuthPage />);

    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });

  it("should render the Sign in submit button", () => {
    render(<AuthPage />);

    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should show loading text when isAuthLoading is true", () => {
    vi.spyOn(useAuthHook, "default").mockReturnValue({
      ...mockUseAuth,
      isAuthLoading: true,
    });

    render(<AuthPage />);

    expect(screen.getByRole("button", { name: "Loading..." })).toBeInTheDocument();
  });

  it("should disable the submit button when loading", () => {
    vi.spyOn(useAuthHook, "default").mockReturnValue({
      ...mockUseAuth,
      isAuthLoading: true,
    });

    render(<AuthPage />);

    expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();
  });

  it("should call handleSubmit when form is submitted", async () => {
    const { container } = render(<AuthPage />);

    const form = container.querySelector("form");
    fireEvent.submit(form!);

    expect(mockUseAuth.handleSubmit).toHaveBeenCalled();
  });

  it("should call handleToggleMode when sign up link is clicked", async () => {
    render(<AuthPage />);

    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(mockUseAuth.handleToggleMode).toHaveBeenCalled();
  });

  it("should call handleTogglePassword when toggle button is clicked", async () => {
    render(<AuthPage />);

    await userEvent.click(screen.getByLabelText("Show password"));

    expect(mockUseAuth.handleTogglePassword).toHaveBeenCalled();
  });

  it("should show hide password button when showPassword is true", () => {
    vi.spyOn(useAuthHook, "default").mockReturnValue({
      ...mockUseAuth,
      showPassword: true,
    });

    render(<AuthPage />);

    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
  });
});

describe("AuthPage — register mode", () => {
  beforeEach(() => {
    vi.spyOn(useAuthHook, "default").mockReturnValue({
      ...mockUseAuth,
      isLoginMode: false,
    });
  });

  it("should render the create account heading", () => {
    render(<AuthPage />);

    expect(screen.getByRole("heading", { name: "Create account" })).toBeInTheDocument();
  });

  it("should render the name field in register mode", () => {
    render(<AuthPage />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("should render the Create account submit button", () => {
    render(<AuthPage />);

    expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
  });

  it("should show sign in link in register mode", () => {
    render(<AuthPage />);

    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("should call handleChange when typing in the name field", async () => {
    render(<AuthPage />);

    await userEvent.type(screen.getByLabelText("Name"), "Wilmer");

    expect(mockUseAuth.handleChange).toHaveBeenCalled();
  });
});
