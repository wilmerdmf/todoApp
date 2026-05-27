import { NotificationActionTypes, NotificationAction, Notification } from "@/types";

export const addNotification = (notification: Notification): NotificationAction => ({
  type: NotificationActionTypes.ADD_NOTIFICATION,
  payload: notification,
});

export const removeNotification = (notificationId: string): NotificationAction => ({
  type: NotificationActionTypes.REMOVE_NOTIFICATION,
  payload: notificationId,
});

export const clearAllNotifications = (): NotificationAction => ({
  type: NotificationActionTypes.CLEAR_ALL_NOTIFICATIONS,
});
