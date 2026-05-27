import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services";
import { useNotificationContext, useApiError } from "@/hooks";
import { NOTIFICATION_MESSAGES, NOTIFICATION_DURATION } from "@/constants";

export const PROJECT_QUERY_KEY = ["projects"];

export const useProjectsQuery = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotificationContext();
  const { handleError } = useApiError();

  const projectsQuery = useQuery({
    queryKey: PROJECT_QUERY_KEY,
    queryFn: projectService.getAll,
  });

  useEffect(() => {
    if (projectsQuery.isError) {
      handleError(projectsQuery.error, NOTIFICATION_MESSAGES.PROJECTS_FETCH_ERROR);
    }
  }, [projectsQuery.isError]);

  const createMutation = useMutation({
    mutationFn: (projectName: string) => projectService.create({ projectName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEY });
      showNotification(NOTIFICATION_MESSAGES.PROJECT_CREATED, "success", NOTIFICATION_DURATION.SHORT);
    },
    onError: (error) => {
      handleError(error, NOTIFICATION_MESSAGES.PROJECT_CREATE_ERROR);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEY });
      showNotification(NOTIFICATION_MESSAGES.PROJECT_DELETED, "success", NOTIFICATION_DURATION.SHORT);
    },
    onError: (error) => {
      handleError(error, NOTIFICATION_MESSAGES.PROJECT_DELETE_ERROR);
    },
  });

  const deleteWithCardsMutation = useMutation({
    mutationFn: (id: string) => projectService.deleteWithCards(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      showNotification(NOTIFICATION_MESSAGES.PROJECT_DELETED, "success", NOTIFICATION_DURATION.SHORT);
    },
    onError: (error) => {
      handleError(error, NOTIFICATION_MESSAGES.PROJECT_DELETE_ERROR);
    },
  });

  const deleteAndUnassignMutation = useMutation({
    mutationFn: (id: string) => projectService.deleteAndUnassignCards(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      showNotification(NOTIFICATION_MESSAGES.PROJECT_DELETED, "success", NOTIFICATION_DURATION.SHORT);
    },
    onError: (error) => {
      handleError(error, NOTIFICATION_MESSAGES.PROJECT_DELETE_ERROR);
    },
  });

  return {
    projects: projectsQuery.data ?? [],
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    createProject: createMutation.mutate,
    isCreating: createMutation.isPending,
    deleteProject: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteProjectWithCards: deleteWithCardsMutation.mutate,
    isDeletingWithCards: deleteWithCardsMutation.isPending,
    deleteProjectAndUnassign: deleteAndUnassignMutation.mutate,
    isDeletingAndUnassigning: deleteAndUnassignMutation.isPending,
  };
};
