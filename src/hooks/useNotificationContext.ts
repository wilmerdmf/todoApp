import { useContext } from "react";
import { NotificationContext } from "@/context";
import { NotificationContextType } from "@/types";

const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within NotificationProvider. " +
        "Make sure your component is wrapped with <NotificationProvider>.",
    );
  }

  return context;
};

export default useNotificationContext;
