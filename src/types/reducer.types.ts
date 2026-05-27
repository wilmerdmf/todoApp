import { MenuOption, DeleteProjectModalData, DeleteCardModalData, Priority } from "./index";

export interface UIState {
  isMenuOpen: boolean;
  activeMenuOption: MenuOption;
  deleteProjectModal: DeleteProjectModalData | null;
  deleteCardModal: DeleteCardModalData | null;
  isLogoutModalOpen: boolean;
  searchQuery: string;
  priorityFilter: Priority | "";
}
