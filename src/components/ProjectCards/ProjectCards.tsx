import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { useFilterCardsByDate, useUIContext, useCardsQuery } from "@/hooks";
import { Inbox } from "lucide-react";
import { Card as CardType } from "@/types";

interface ProjectCardsProps {
  onEditCard: (card: CardType) => void;
}

const SortableCard = ({ card, onEditCard }: { card: CardType; onEditCard: (card: CardType) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card card={card} onEdit={onEditCard} />
    </div>
  );
};

const CardSkeleton = () => (
  <div className="card-skeleton">
    <div className="skeleton-line skeleton-title" />
    <div className="skeleton-line skeleton-subtitle" />
    <div className="skeleton-line skeleton-text" />
    <div className="skeleton-line skeleton-text short" />
    <div className="skeleton-footer">
      <div className="skeleton-line skeleton-badge" />
      <div className="skeleton-line skeleton-badge" />
    </div>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="empty-state">
    <Inbox size={40} strokeWidth={1} color="#6d737c" />
    <p className="empty-state-text">{message}</p>
  </div>
);

const ProjectCards = ({ onEditCard }: ProjectCardsProps) => {
  const { activeMenuOption, searchQuery, priorityFilter } = useUIContext();
  const { cards, isLoading, isError, reorderCards } = useCardsQuery();
  const filteredCards = useFilterCardsByDate(activeMenuOption, cards, searchQuery, priorityFilter);

  const [localCards, setLocalCards] = useState<CardType[]>([]);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  useEffect(() => {
    const serialize = (cards: CardType[]) =>
      cards.map((c) => `${c.id}:${c.title}:${c.description}:${c.priority}:${c.date}:${c.projectId}`).join("|");

    if (serialize(localCards) !== serialize(filteredCards)) {
      setLocalCards(filteredCards);
    }
  }, [filteredCards]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  const getEmptyMessage = () => {
    if (searchQuery.trim() !== "" || priorityFilter !== "") return "No tasks match your search";
    if (activeMenuOption === "today") return "No tasks for today";
    if (activeMenuOption === "week") return "No tasks for this week";
    if (activeMenuOption.startsWith("project:")) return "No tasks in this project";
    return "No tasks yet — add one to get started";
  };

  const handleDragStart = (event: DragStartEvent) => {
    const card = localCards.find((c) => c.id === event.active.id);
    setActiveCard(card ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const oldIndex = localCards.findIndex((c) => c.id === active.id);
    const newIndex = localCards.findIndex((c) => c.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(localCards, oldIndex, newIndex);
    setLocalCards(reordered);

    const filteredIds = reordered.map((c) => c.id);
    const otherCards = cards.filter((c) => !filteredIds.includes(c.id));
    const allOrderedIds = [...filteredIds, ...otherCards.map((c) => c.id)];

    reorderCards(allOrderedIds);
  };

  if (isLoading) {
    return (
      <div className="project-cards-container">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fullscreen-center error-screen">
        <div>Error loading tasks</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={localCards.map((c) => c.id)} strategy={rectSortingStrategy}>
        <div className="project-cards-container">
          {localCards.length > 0 ? (
            localCards.map((card) => <SortableCard key={card.id} card={card} onEditCard={onEditCard} />)
          ) : (
            <EmptyState message={getEmptyMessage()} />
          )}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeCard ? (
          <div style={{ opacity: 0.85, transform: "scale(1.03)", cursor: "grabbing" }}>
            <Card card={activeCard} onEdit={onEditCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ProjectCards;
