import { UIProvider } from "./ui";
import { NotificationProvider } from "./notification";
import { AuthProvider } from "./auth";
import { ProviderProps } from "@/types";

export function AppProviders({ children }: ProviderProps) {
  return (
    <UIProvider>
      <NotificationProvider>
        <AuthProvider>{children}</AuthProvider>
      </NotificationProvider>
    </UIProvider>
  );
}
