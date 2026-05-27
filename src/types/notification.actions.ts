import { Notification } from "./notification.types";

export enum NotificationActionTypes {
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",
  CLEAR_ALL_NOTIFICATIONS = "CLEAR_ALL_NOTIFICATIONS",
}

export type NotificationAction =
  | { type: NotificationActionTypes.ADD_NOTIFICATION; payload: Notification }
  | { type: NotificationActionTypes.REMOVE_NOTIFICATION; payload: string }
  | { type: NotificationActionTypes.CLEAR_ALL_NOTIFICATIONS };
