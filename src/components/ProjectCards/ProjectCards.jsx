import useFilterCardsByDate from "../../hooks/useFilterCardsByDate";
import Card from "./Card";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

const ProjectCards = () => {
  const { activeMenuOption } = useContext(MainContext);
  const filteredCards = useFilterCardsByDate(activeMenuOption);

  return (
    <div className="project-cards-container">
      {filteredCards.length > 0 ? filteredCards.map((card) => <Card key={card.id} card={card} />) : null}
    </div>
  );
};

export default ProjectCards;
