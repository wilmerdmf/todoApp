import { MenuOption, Card, Priority } from "@/types";
import { isToday, isThisWeek } from "@/utils";
import { DATE_FORMATS } from "@/constants";

const useFilterCards = (
  option: MenuOption,
  projectCardList: Card[],
  searchQuery: string,
  priorityFilter: Priority | "",
): Card[] => {
  let filtered = projectCardList;

  if (option === "today") {
    filtered = filtered.filter((card) => {
      if (!card.date || card.date === DATE_FORMATS.EMPTY_VALUE) return false;
      return isToday(card.date);
    });
  } else if (option === "week") {
    filtered = filtered.filter((card) => {
      if (!card.date || card.date === DATE_FORMATS.EMPTY_VALUE) return false;
      return isThisWeek(card.date);
    });
  } else if (option.startsWith("project:")) {
    const projectId = option.replace("project:", "");
    filtered = filtered.filter((card) => card.projectId === projectId);
  }

  if (searchQuery.trim() !== "") {
    const query = searchQuery.trim().toLowerCase();
    filtered = filtered.filter((card) => card.title.toLowerCase().includes(query));
  }

  if (priorityFilter !== "") {
    filtered = filtered.filter((card) => card.priority === priorityFilter);
  }

  return filtered;
};

export default useFilterCards;
