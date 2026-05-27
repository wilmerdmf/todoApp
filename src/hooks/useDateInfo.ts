import { useMemo } from "react";
import { isPastDate, isFutureDate, isToday, parseDisplayDate, parseInputDate } from "@/utils";
import { DATE_FORMATS } from "@/constants";
import { DateInfo } from "@/types";

const useDateInfo = (date: string, className = ""): DateInfo => {
  return useMemo(() => {
    const parsedDate = parseDisplayDate(date) || parseInputDate(date);
    const hasDate = Boolean(date && date !== DATE_FORMATS.EMPTY_VALUE && date.trim() !== "" && parsedDate !== null);

    if (!hasDate) {
      return {
        hasDate: false,
        isOverdue: false,
        isToday: false,
        isFuture: false,
        displayText: DATE_FORMATS.EMPTY_DISPLAY,
        dateClassName: className,
      };
    }

    const isOverdue = isPastDate(date);
    const isTodayDate = isToday(date);
    const isFuture = isFutureDate(date);

    const classes = ["card-date"];
    if (isOverdue) classes.push("date-overdue");
    if (isTodayDate) classes.push("date-today");
    if (isFuture) classes.push("date-future");
    if (className) classes.push(className);

    return {
      hasDate: true,
      isOverdue,
      isToday: isTodayDate,
      isFuture,
      displayText: date.split("-").reverse().join("-"),
      dateClassName: classes.join(" "),
    };
  }, [date, className]);
};

export default useDateInfo;
