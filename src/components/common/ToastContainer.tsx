import Toast from "./Toast";
import { useNotificationContext } from "@/hooks";

const ToastContainer = () => {
  const { notifications } = useNotificationContext();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default ToastContainer;
