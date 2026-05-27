import { useReducer, useMemo, useCallback } from "react";
import { NotificationContext } from "./NotificationContext";
import { notificationReducer, notificationInitialState } from "@/reducers";
import { addNotification, removeNotification, clearAllNotifications } from "@/actions";
import { ProviderProps, NotificationType } from "@/types";
import { generateUniqueId } from "@/utils";
import { NOTIFICATION_DURATION } from "@/constants";

export function NotificationProvider({ children }: ProviderProps) {
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, notificationInitialState);

  const showNotification = useCallback(
    (message: string, type: NotificationType, duration: number = NOTIFICATION_DURATION.MEDIUM) => {
      const notification = {
        id: generateUniqueId(),
        message,
        type,
        duration,
      };

      notificationDispatch(addNotification(notification));

      setTimeout(() => {
        notificationDispatch(removeNotification(notification.id));
      }, duration);
    },
    [],
  );

  const handleRemoveNotification = useCallback((id: string) => {
    notificationDispatch(removeNotification(id));
  }, []);

  const handleClearAllNotifications = useCallback(() => {
    notificationDispatch(clearAllNotifications());
  }, []);

  const value = useMemo(
    () => ({
      notifications: notificationState.notifications,
      notificationDispatch,
      showNotification,
      removeNotification: handleRemoveNotification,
      clearAllNotifications: handleClearAllNotifications,
    }),
    [notificationState.notifications, showNotification, handleRemoveNotification, handleClearAllNotifications],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
