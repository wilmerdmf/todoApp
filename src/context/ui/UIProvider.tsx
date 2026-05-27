import { useReducer, useMemo } from "react";
import { UIContext } from "./UIContext";
import { uiReducer, uiInitialState } from "@/reducers";
import { ProviderProps } from "@/types";

export function UIProvider({ children }: ProviderProps) {
  const [uiState, uiDispatch] = useReducer(uiReducer, uiInitialState);

  const value = useMemo(
    () => ({
      isMenuOpen: uiState.isMenuOpen,
      activeMenuOption: uiState.activeMenuOption,
      deleteProjectModal: uiState.deleteProjectModal,
      deleteCardModal: uiState.deleteCardModal,
      isLogoutModalOpen: uiState.isLogoutModalOpen,
      searchQuery: uiState.searchQuery,
      priorityFilter: uiState.priorityFilter,
      uiDispatch,
    }),
    [
      uiState.isMenuOpen,
      uiState.activeMenuOption,
      uiState.deleteProjectModal,
      uiState.deleteCardModal,
      uiState.isLogoutModalOpen,
      uiState.searchQuery,
      uiState.priorityFilter,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
