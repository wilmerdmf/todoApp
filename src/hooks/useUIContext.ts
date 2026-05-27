import { useContext } from "react";
import { UIContext } from "@/context";
import { UIContextType } from "@/types";

const useUIContext = (): UIContextType => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error(
      "useUI must be used within UIProvider. " + "Make sure your component is wrapped with <UIProvider>.",
    );
  }

  return context;
};

export default useUIContext;
