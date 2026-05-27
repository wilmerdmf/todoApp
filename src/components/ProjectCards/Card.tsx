import { MouseEvent } from "react";
import { Trash } from "lucide-react";
import { useSetProject, useUIContext } from "@/hooks";
import { setDeleteCardModal } from "@/actions";
import { Card as CardType, CardProps } from "@/types";
import { DateDisplay } from "@/components";
import { UI_TEXT } from "@/constants";

interface CardComponentProps extends CardProps {
  onEdit: (card: CardType) => void;
}

const Card = ({ card, onEdit }: CardComponentProps) => {
  const { title, description, priority, date } = card;
  const { uiDispatch } = useUIContext();
  const { currentProject } = useSetProject(card);

  const handleCardClick = (): void => {
    onEdit(card);
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    uiDispatch(setDeleteCardModal({ cardId: card.id, cardTitle: card.title }));
  };

  return (
    <article
      className="card-element"
      data-meta-prio={priority}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
      aria-label={`Task: ${title}. Priority: ${priority}. Click to edit.`}
    >
      <button className="delete-todo-button" onClick={handleDeleteClick} aria-label={`Delete task: ${title}`}>
        <Trash size={18} color="#e6edf3" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <div>
        <h3>{title}</h3>
        <p className="card-project-subtitle">{currentProject || UI_TEXT.NO_PROJECT}</p>
      </div>

      <p className="card-text">{description}</p>

      <div className="card-info">
        <p className="priority-text" data-meta-prio={priority}>
          {priority}
        </p>

        <DateDisplay date={date} />
      </div>
    </article>
  );
};

export default Card;
