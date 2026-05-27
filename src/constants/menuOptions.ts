import { MenuOption } from "@/types";

export const MENU_OPTIONS: readonly MenuOption[] = ["home", "today", "week"] as const;

export const DEFAULT_MENU_OPTION: MenuOption = "home";

export const MENU_LABELS: Record<MenuOption, string> = {
  home: "Home",
  today: "Today",
  week: "Week",
};
