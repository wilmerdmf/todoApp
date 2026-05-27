import { useNotificationContext } from "@/hooks";
import { parseAPIError, getUserFriendlyMessage } from "@/utils/errorHandler";
import { NOTIFICATION_DURATION } from "@/constants";

const useApiError = () => {
  const { showNotification } = useNotificationContext();

  const handleError = (error: unknown, fallbackMessage?: string): void => {
    const appError = parseAPIError(error);
    const message = getUserFriendlyMessage(appError) || fallbackMessage || "An unexpected error occurred.";
    showNotification(message, "error", NOTIFICATION_DURATION.MEDIUM);
  };

  return { handleError };
};

export default useApiError;
