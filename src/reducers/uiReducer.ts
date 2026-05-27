import { UIState, UIAction, UIActionTypes } from "@/types";
import { DEFAULT_MENU_OPTION } from "@/constants";

export const uiInitialState: UIState = {
  isMenuOpen: false,
  activeMenuOption: DEFAULT_MENU_OPTION,
  deleteProjectModal: null,
  deleteCardModal: null,
  isLogoutModalOpen: false,
  searchQuery: "",
  priorityFilter: "",
};

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case UIActionTypes.SET_MENU_OPEN:
      return { ...state, isMenuOpen: action.payload };

    case UIActionTypes.TOGGLE_MENU:
      return { ...state, isMenuOpen: !state.isMenuOpen };

    case UIActionTypes.SET_ACTIVE_MENU_OPTION:
      return { ...state, activeMenuOption: action.payload };

    case UIActionTypes.SET_DELETE_PROJECT_MODAL:
      return { ...state, deleteProjectModal: action.payload };

    case UIActionTypes.SET_DELETE_CARD_MODAL:
      return { ...state, deleteCardModal: action.payload };

    case UIActionTypes.SET_LOGOUT_MODAL:
      return { ...state, isLogoutModalOpen: action.payload };

    case UIActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case UIActionTypes.SET_PRIORITY_FILTER:
      return { ...state, priorityFilter: action.payload };

    case UIActionTypes.RESET_UI:
      return uiInitialState;

    default:
      return state;
  }
};
