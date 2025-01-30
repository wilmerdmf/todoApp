import { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";

const useProjectList = () => {
  const { projectList, setProjectList, setIsProjectFormActive } = useContext(MainContext);

  //! New project name state
  const [newProjectName, setnewProjectName] = useState("");

  //! New project input handler
  const handleNewProjectInput = (e) => {
    setnewProjectName(e.target.value);
  };

  //! Open project form handler
  const handleOpenNewProjectForm = () => {
    setIsProjectFormActive(true);
  };

  //! Close project form handler
  const handleCloseNewProjectForm = (e) => {
    e.preventDefault();
    setIsProjectFormActive(false);
  };

  //! New project submit handler
  const handleAddNewProject = (e) => {
    e.preventDefault();
    const projectExists = projectList.some(
      (project) => project.projectName.toLowerCase() === newProjectName.toLowerCase()
    );
    if (!newProjectName || projectExists) return;
    const newProjectItem = { projectName: newProjectName, id: crypto.randomUUID() };
    setProjectList([...projectList, newProjectItem]);
    setnewProjectName("");
    setIsProjectFormActive(false);
  };

  //! Delete project from list handler
  const handleDeleteProject = (projectNameToDelete) => {
    const newProjectList = projectList.filter((project) => project.projectName !== projectNameToDelete);
    setProjectList(newProjectList);
  };

  return {
    handleOpenNewProjectForm,
    handleCloseNewProjectForm,
    newProjectName,
    handleNewProjectInput,
    handleAddNewProject,
    handleDeleteProject,
  };
};

export default useProjectList;
