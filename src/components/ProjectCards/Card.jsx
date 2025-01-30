import PropTypes from "prop-types";
import Icon from "../../icons/Icon";
import useCard from "../../hooks/useCard";
import useSetProject from "../../hooks/useSetProject";

const Card = ({ card }) => {
  const { title, description, priority, date } = card;
  const { handleDeleteProjectCard, handleEditProjectCard } = useCard(card);
  const { currentProject } = useSetProject(card);

  return (
    <article className="card-element" data-meta-prio={priority ? priority : "Chill"}>
      <button className="delete-todo-button" onClick={handleDeleteProjectCard}>
        <Icon name="deleteProject" size="20" color="#172431" />
      </button>

      <div>
        <h3>{title}</h3>
        <p className="card-project-subtitle">{currentProject ? currentProject : "No project"}</p>
      </div>

      <p className="card-text">{description}</p>

      <div className="card-info">
        <p className="priority-text" data-meta-prio={priority ? priority : "Chill"}>
          {priority ? priority : "Chill"}
        </p>

        <time>{date ? date : "no date"}</time>

        <button onClick={handleEditProjectCard}>
          <Icon name="editProjectCard" size="30" color="#172431" />
        </button>
      </div>
    </article>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.string.isRequired,
    date: PropTypes.string,
  }).isRequired,
};

export default Card;
