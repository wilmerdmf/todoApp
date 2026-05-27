import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toast from "@/components/common/Toast";
import { NotificationContext } from "@/context/notification/NotificationContext";
import type { Notification, NotificationContextType } from "@/types";

const mockRemoveNotification = vi.fn();

const makeMockContext = (overrides = {}): NotificationContextType => ({
  notifications: [],
  notificationDispatch: vi.fn(),
  showNotification: vi.fn(),
  removeNotification: mockRemoveNotification,
  clearAllNotifications: vi.fn(),
  ...overrides,
});

const renderToast = (notification: Notification) => {
  return render(
    <NotificationContext.Provider value={makeMockContext({ notifications: [notification] })}>
      <Toast notification={notification} />
    </NotificationContext.Provider>,
  );
};

const makeNotification = (overrides = {}): Notification => ({
  id: "notif-1",
  message: "Test message",
  type: "success",
  duration: 0,
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Toast", () => {
  it("should render the notification message", () => {
    renderToast(makeNotification({ message: "Task created!" }));

    expect(screen.getByText("Task created!")).toBeInTheDocument();
  });

  it("should apply the correct class for success type", () => {
    renderToast(makeNotification({ type: "success" }));

    expect(screen.getByRole("alert")).toHaveClass("toast-success");
  });

  it("should apply the correct class for error type", () => {
    renderToast(makeNotification({ type: "error" }));

    expect(screen.getByRole("alert")).toHaveClass("toast-error");
  });

  it("should apply the correct class for warning type", () => {
    renderToast(makeNotification({ type: "warning" }));

    expect(screen.getByRole("alert")).toHaveClass("toast-warning");
  });

  it("should apply the correct class for info type", () => {
    renderToast(makeNotification({ type: "info" }));

    expect(screen.getByRole("alert")).toHaveClass("toast-info");
  });

  it("should call removeNotification when close button is clicked", async () => {
    renderToast(makeNotification({ id: "notif-1" }));

    await userEvent.click(screen.getByLabelText("Close notification"));

    expect(mockRemoveNotification).toHaveBeenCalledWith("notif-1");
  });

  it("should call removeNotification after duration expires", () => {
    vi.useFakeTimers();

    renderToast(makeNotification({ id: "notif-1", duration: 3000 }));

    expect(mockRemoveNotification).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockRemoveNotification).toHaveBeenCalledWith("notif-1");

    vi.useRealTimers();
  });

  it("should not auto-dismiss when duration is 0", () => {
    vi.useFakeTimers();

    renderToast(makeNotification({ duration: 0 }));

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(mockRemoveNotification).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
