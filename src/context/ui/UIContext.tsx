import { createContext } from "react";
import { UIContextType } from "@/types";

export const UIContext = createContext<UIContextType | undefined>(undefined);
