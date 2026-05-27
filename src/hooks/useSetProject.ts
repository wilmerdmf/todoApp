import { useEffect, useState } from "react";
import { Card } from "@/types";
import { useProjectsQuery } from "@/hooks";

const useSetProject = (card: Card) => {
  const { projects } = useProjectsQuery();
  const [currentProject, setCurrentProject] = useState<string>("");

  useEffect(() => {
    const project = projects.find((project) => project.id === card.projectId);
    setCurrentProject(project?.projectName || "No project");
  }, [projects, card.projectId]);

  return { currentProject };
};

export default useSetProject;
