import { useState, FormEvent, ChangeEvent } from "react";
import { useAuthContext, useNotificationContext } from "@/hooks";
import { NOTIFICATION_DURATION } from "@/constants";

const useAuth = () => {
  const { login, register, isAuthLoading } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
      const serverMessage = axiosError?.response?.data?.error?.message;

      if (serverMessage === "Invalid email or password") {
        showNotification("Incorrect email or password. Please try again.", "error", NOTIFICATION_DURATION.MEDIUM);
      } else if (serverMessage === "Email already in use") {
        showNotification("This email is already registered. Please sign in.", "error", NOTIFICATION_DURATION.MEDIUM);
      } else {
        showNotification(
          isLoginMode ? "Could not sign in. Please try again." : "Could not create account. Please try again.",
          "error",
          NOTIFICATION_DURATION.MEDIUM,
        );
      }
    }
  };

  const handleToggleMode = (): void => {
    setShowPassword(false);
    setFormData({ name: "", email: "", password: "" });
    setIsLoginMode((prev) => !prev);
  };

  const handleTogglePassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  return {
    isLoginMode,
    isAuthLoading,
    formData,
    showPassword,
    handleChange,
    handleSubmit,
    handleToggleMode,
    handleTogglePassword,
  };
};

export default useAuth;
