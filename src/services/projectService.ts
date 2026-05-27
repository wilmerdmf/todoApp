import api from "./api";
import { Project, APIResponse, ProjectAPIResponse } from "@/types";
import { parseAPIError, logError } from "@/utils/errorHandler";

const mapFromAPI = (data: ProjectAPIResponse): Project => ({
  id: data._id,
  projectName: data.projectName,
});

const mapToAPI = (project: Partial<Project>) => ({
  projectName: project.projectName,
});

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    try {
      const { data } = await api.get<APIResponse<ProjectAPIResponse[]>>("/projects");
      return data.data?.map(mapFromAPI) ?? [];
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, "projectService.getAll");
      throw error;
    }
  },

  create: async (project: Omit<Project, "id">): Promise<Project> => {
    try {
      const { data } = await api.post<APIResponse<ProjectAPIResponse>>("/projects", mapToAPI(project));
      if (!data.data) {
        throw new Error("No data received from server");
      }
      return mapFromAPI(data.data);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, "projectService.create");
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/projects/${id}`);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, `projectService.delete(${id})`);
      throw error;
    }
  },

  deleteWithCards: async (id: string): Promise<void> => {
    try {
      await api.delete(`/projects/${id}/cards`);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, `projectService.deleteWithCards(${id})`);
      throw error;
    }
  },

  deleteAndUnassignCards: async (id: string): Promise<void> => {
    try {
      await api.patch(`/projects/${id}/unassign`);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, `projectService.deleteAndUnassignCards(${id})`);
      throw error;
    }
  },

  getCardsCount: async (id: string): Promise<number> => {
    try {
      const { data } = await api.get<APIResponse<{ projectId: string; count: number }>>(`/projects/${id}/cards/count`);
      return data.data?.count ?? 0;
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, `projectService.getCardsCount(${id})`);
      throw error;
    }
  },
};
