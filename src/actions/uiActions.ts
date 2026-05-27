import { UIActionTypes, UIAction, MenuOption, DeleteProjectModalData, DeleteCardModalData, Priority } from "@/types";

export const setMenuOpen = (isOpen: boolean): UIAction => ({
  type: UIActionTypes.SET_MENU_OPEN,
  payload: isOpen,
});

export const toggleMenu = (): UIAction => ({
  type: UIActionTypes.TOGGLE_MENU,
});

export const setActiveMenuOption = (option: MenuOption): UIAction => ({
  type: UIActionTypes.SET_ACTIVE_MENU_OPTION,
  payload: option,
});

export const setDeleteProjectModal = (data: DeleteProjectModalData | null): UIAction => ({
  type: UIActionTypes.SET_DELETE_PROJECT_MODAL,
  payload: data,
});

export const setDeleteCardModal = (data: DeleteCardModalData | null): UIAction => ({
  type: UIActionTypes.SET_DELETE_CARD_MODAL,
  payload: data,
});

export const setLogoutModal = (isOpen: boolean): UIAction => ({
  type: UIActionTypes.SET_LOGOUT_MODAL,
  payload: isOpen,
});

export const setSearchQuery = (query: string): UIAction => ({
  type: UIActionTypes.SET_SEARCH_QUERY,
  payload: query,
});

export const setPriorityFilter = (priority: Priority | ""): UIAction => ({
  type: UIActionTypes.SET_PRIORITY_FILTER,
  payload: priority,
});

export const resetUI = (): UIAction => ({
  type: UIActionTypes.RESET_UI,
});
