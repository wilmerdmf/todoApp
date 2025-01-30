import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { isSameDay, isThisWeek } from "date-fns";

const useFilterCardsByDate = (option) => {
  const { projectCardList } = useContext(MainContext);

  const today = new Date();
  if (option === "today") {
    return projectCardList.filter((card) => card.date && isSameDay(new Date(card.date), today));
  }
  if (option === "week") {
    return projectCardList.filter((card) => card.date && isThisWeek(new Date(card.date), { weekStartsOn: 1 }));
  }

  return projectCardList;
};

export default useFilterCardsByDate;
