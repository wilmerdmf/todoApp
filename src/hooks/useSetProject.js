/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";

const useSetProject = (card) => {
  const { projectList } = useContext(MainContext);

  //! Current project on card state
  const [currentProject, setCurrentProject] = useState("");

  //! Set current project on card data handler
  const findProject = () => {
    const project = projectList.find((project) => project.id === card.projectId);
    setCurrentProject(project?.projectName || "No project");
  };

  useEffect(() => {
    findProject();
  }, [projectList, card.projectId]);

  return {
    currentProject,
    findProject,
  };
};

export default useSetProject;
