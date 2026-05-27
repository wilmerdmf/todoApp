import { Dispatch, ReactNode } from "react";
import {
  MenuOption,
  DeleteProjectModalData,
  DeleteCardModalData,
  Priority,
  UIAction,
  Notification,
  NotificationAction,
  NotificationType,
} from "./index";

export interface UIContextType {
  isMenuOpen: boolean;
  activeMenuOption: MenuOption;
  deleteProjectModal: DeleteProjectModalData | null;
  deleteCardModal: DeleteCardModalData | null;
  isLogoutModalOpen: boolean;
  searchQuery: string;
  priorityFilter: Priority | "";
  uiDispatch: Dispatch<UIAction>;
}

export interface NotificationContextType {
  notifications: Notification[];
  notificationDispatch: Dispatch<NotificationAction>;
  showNotification: (message: string, type: NotificationType, duration?: number) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
