import useProjectList from "../../hooks/useProjectList";

const AddProjectItemButton = () => {
  const { handleOpenNewProjectForm } = useProjectList();

  return (
    <div className="add-new-project-button-container">
      <button onClick={handleOpenNewProjectForm}>Add new project</button>
    </div>
  );
};

export default AddProjectItemButton;
