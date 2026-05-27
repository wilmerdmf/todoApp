import { Calendar, AlertCircle, Clock } from "lucide-react";
import { useDateInfo } from "@/hooks";
import { DateDisplayProps } from "@/types";

const DateDisplay = ({ date, className = "" }: DateDisplayProps) => {
  const { hasDate, isOverdue, isToday, displayText, dateClassName } = useDateInfo(date, className);

  if (!hasDate) {
    return <span className={`no-date-text ${className}`}>{displayText}</span>;
  }

  const getIcon = () => {
    if (isOverdue) return <AlertCircle size={14} />;
    if (isToday) return <Clock size={14} />;
    return <Calendar size={14} />;
  };

  return (
    <time className={dateClassName}>
      {getIcon()}
      {displayText}
    </time>
  );
};

export default DateDisplay;
