import { MenuOption, DeleteProjectModalData, DeleteCardModalData, Priority } from "./index";

export enum UIActionTypes {
  SET_MENU_OPEN = "SET_MENU_OPEN",
  TOGGLE_MENU = "TOGGLE_MENU",
  SET_ACTIVE_MENU_OPTION = "SET_ACTIVE_MENU_OPTION",
  SET_DELETE_PROJECT_MODAL = "SET_DELETE_PROJECT_MODAL",
  SET_DELETE_CARD_MODAL = "SET_DELETE_CARD_MODAL",
  SET_LOGOUT_MODAL = "SET_LOGOUT_MODAL",
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
  SET_PRIORITY_FILTER = "SET_PRIORITY_FILTER",
  RESET_UI = "RESET_UI",
}

export type UIAction =
  | { type: UIActionTypes.SET_MENU_OPEN; payload: boolean }
  | { type: UIActionTypes.TOGGLE_MENU }
  | { type: UIActionTypes.SET_ACTIVE_MENU_OPTION; payload: MenuOption }
  | { type: UIActionTypes.SET_DELETE_PROJECT_MODAL; payload: DeleteProjectModalData | null }
  | { type: UIActionTypes.SET_DELETE_CARD_MODAL; payload: DeleteCardModalData | null }
  | { type: UIActionTypes.SET_LOGOUT_MODAL; payload: boolean }
  | { type: UIActionTypes.SET_SEARCH_QUERY; payload: string }
  | { type: UIActionTypes.SET_PRIORITY_FILTER; payload: Priority | "" }
  | { type: UIActionTypes.RESET_UI };
