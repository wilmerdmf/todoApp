import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { AuthContextType } from "@/types";

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export default useAuthContext;
