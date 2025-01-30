import Icon from "../../icons/Icon";
import useProjectList from "../../hooks/useProjectList";

const NewProjectItemForm = () => {
  const { newProjectName, handleNewProjectInput, handleAddNewProject, handleCloseNewProjectForm } = useProjectList();

  return (
    <form className="add-project-form">
      <input
        type="text"
        name="NewProject"
        value={newProjectName}
        onChange={handleNewProjectInput}
        minLength="1"
        maxLength="15"
        autoComplete="off"
        required
      />

      <button className="project-form-add-button" onClick={handleAddNewProject}>
        <Icon name="addProjectItem" size="25" color="#27ae60" />
      </button>

      <button className="project-form-cancel-button" onClick={handleCloseNewProjectForm}>
        <Icon name="cancelProjectItem" size="25" color="#c0392b" />
      </button>
    </form>
  );
};

export default NewProjectItemForm;
