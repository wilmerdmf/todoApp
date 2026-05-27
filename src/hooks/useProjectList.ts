import { useState, FormEvent, ChangeEvent } from "react";
import { projectExists, validateProjectName, sanitizeString } from "@/utils";
import { NOTIFICATION_MESSAGES, NOTIFICATION_DURATION, VALIDATION_MESSAGES } from "@/constants";
import { setDeleteProjectModal } from "@/actions";
import { useUIContext, useNotificationContext, useFormValidation, useProjectsQuery, useCardsQuery } from "@/hooks";

const useProjectList = () => {
  const [isProjectFormActive, setProjectFormActive] = useState(false);
  const [newProjectName, setNewProjectName] = useState<string>("");

  const { uiDispatch } = useUIContext();
  const { showNotification } = useNotificationContext();
  const { errors, setError, clearError, clearAllErrors } = useFormValidation();
  const { projects, createProject, deleteProject, isCreating } = useProjectsQuery();
  const { cards } = useCardsQuery();

  const handleNewProjectInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setNewProjectName(value);

    if (errors.projectName) {
      clearError("projectName");
    }
  };

  const handleOpenNewProjectForm = (): void => {
    clearAllErrors();
    setProjectFormActive(true);
  };

  const handleCloseNewProjectForm = (e: FormEvent): void => {
    e.preventDefault();
    clearAllErrors();
    setProjectFormActive(false);
    setNewProjectName("");
  };

  const handleAddNewProject = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    clearAllErrors();

    const validation = validateProjectName(newProjectName);
    if (!validation.isValid) {
      setError("projectName", validation.error || "Invalid project name");
      showNotification(validation.error || "Invalid project name", "error", NOTIFICATION_DURATION.SHORT);
      return;
    }

    if (projectExists(newProjectName, projects)) {
      setError("projectName", VALIDATION_MESSAGES.PROJECT_EXISTS);
      showNotification(NOTIFICATION_MESSAGES.PROJECT_EXISTS, "warning", NOTIFICATION_DURATION.SHORT);
      return;
    }

    const sanitizedName = sanitizeString(newProjectName);
    createProject(sanitizedName, {
      onSuccess: () => {
        setNewProjectName("");
        setProjectFormActive(false);
      },
    });
  };

  const handleDeleteProject = (projectId: string, projectName: string): void => {
    const affectedCards = cards.filter((card) => card.projectId === projectId);

    if (affectedCards.length > 0) {
      uiDispatch(
        setDeleteProjectModal({
          projectId,
          projectName,
          affectedCardsCount: affectedCards.length,
        }),
      );
    } else {
      deleteProject(projectId);
    }
  };

  return {
    isProjectFormActive,
    handleOpenNewProjectForm,
    handleCloseNewProjectForm,
    newProjectName,
    handleNewProjectInput,
    handleAddNewProject,
    handleDeleteProject,
    isSubmitting: isCreating,
    errors,
  };
};

export default useProjectList;
