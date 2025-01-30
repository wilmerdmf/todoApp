import { useContext, useEffect } from "react";
import { MainContext } from "../../context/MainContext";
import Icon from "../../icons/Icon";
import useCard from "../../hooks/useCard";

const NewCardForm = () => {
  const { projectList, isFormOpen, projectCardData } = useContext(MainContext);
  const { handleCloseCardForm, handleProjectCardForm, handleSendProjectCard } = useCard();

  // Disable body scroll
  useEffect(() => {
    if (isFormOpen) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  }, [isFormOpen]);

  return (
    <section className={`add-todo-menu-container ${isFormOpen ? "is-active" : ""}`}>
      <button className="close-todo-menu" onClick={handleCloseCardForm}>
        <Icon name="closeMenu" size="35" color="#c0392b" />
      </button>

      <form className="add-todo-form">
        <div className="input-container">
          <label htmlFor="toDo-title">To-Do Title:</label>

          <input
            type="text"
            id="toDo-title"
            name="title"
            placeholder="Title"
            maxLength="22"
            onChange={handleProjectCardForm}
            value={projectCardData.title}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="toDo-description">To-Do Description:</label>

          <textarea
            id="toDo-description"
            name="description"
            placeholder="Description"
            maxLength="80"
            onChange={handleProjectCardForm}
            value={projectCardData.description}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="toDo-priority">Priority:</label>

          <select
            id="toDo-priority"
            name="priority"
            onChange={handleProjectCardForm}
            value={projectCardData.priority}
            required
          >
            <option value="" disabled>
              Choose Priority
            </option>
            <option value="Chill">Chill (Default)</option>
            <option value="Medium">Medium</option>
            <option value="Important">Important</option>
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="toDo-date">Date: MM/DD/YYYY</label>

          <input
            type="date"
            id="toDo-date"
            name="date"
            onChange={handleProjectCardForm}
            value={projectCardData.date}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="toDo-project">Project:</label>

          <select
            id="toDo-project"
            name="projectId"
            onChange={handleProjectCardForm}
            value={projectCardData.projectId || "null"}
            required
          >
            <option value="">No project</option>

            {projectList.map((project) => (
              <option key={project.projectName} value={project.id}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>

        <div className="send-todo-container">
          <button className="send-todo-button" onClick={handleSendProjectCard}>
            <Icon name="addProjectItem" size="35" color="#27ae60" />
            <span>Submit</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewCardForm;
