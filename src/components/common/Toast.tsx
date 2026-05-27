import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useNotificationContext } from "@/hooks";
import { ToastProps } from "@/types";

const Toast = ({ notification }: ToastProps) => {
  const { removeNotification } = useNotificationContext();

  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.duration, removeNotification]);

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <AlertCircle size={20} />;
      case "warning":
        return <AlertTriangle size={20} />;
      case "info":
        return <Info size={20} />;
    }
  };

  return (
    <div className={`toast toast-${notification.type}`} role="alert" aria-live="assertive">
      <div className="toast-icon">{getIcon()}</div>
      <p className="toast-message">{notification.message}</p>
      <button
        className="toast-close"
        onClick={() => removeNotification(notification.id)}
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
