import api from "./api";
import { Card, APIResponse, CardAPIResponse } from "@/types";
import { parseAPIError, logError } from "@/utils/errorHandler";

type CardPayload = Omit<Card, "id" | "order">;

const mapFromAPI = (data: CardAPIResponse): Card => {
  let projectId = "";
  if (data.projectId) {
    projectId = typeof data.projectId === "string" ? data.projectId : data.projectId._id;
  }

  return {
    id: data._id,
    title: data.title,
    description: data.description,
    priority: data.priority,
    date: data.date,
    projectId,
    order: data.order ?? 0,
  };
};

const mapToAPI = (card: CardPayload) => ({
  title: card.title,
  description: card.description,
  priority: card.priority,
  date: card.date,
  projectId: card.projectId?.trim() || null,
});

export const cardService = {
  getAll: async (): Promise<Card[]> => {
    try {
      const { data } = await api.get<APIResponse<CardAPIResponse[]>>("/cards");
      return data.data?.map(mapFromAPI) ?? [];
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, "cardService.getAll");
      throw error;
    }
  },

  getById: async (id: string): Promise<Card> => {
    try {
      const { data } = await api.get<APIResponse<CardAPIResponse>>(`/cards/${id}`);
      if (!data.data) {
        throw new Error("No data received from server");
      }
      return mapFromAPI(data.data);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, `cardService.getById(${id})`);
      throw error;
    }
  },

  create: async (card: CardPayload): Promise<Card> => {
    try {
      const { data } = await api.post<APIResponse<CardAPIResponse>>("/cards", mapToAPI(card));
      if (!data.data) {
        throw new Error("No data received from server");
      }
      return mapFromAPI(data.data);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, "cardService.create");
      throw error;
    }
  },

  update: async (id: string, card: CardPayload): Promise<Card> => {
    try {
      const { data } = await api.put<APIResponse<CardAPIResponse>>(`/cards/${id}`, mapToAPI(card));
      if (!data.data) {
        throw new Error("No data received from server");
      }
      return mapFromAPI(data.data);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, `cardService.update(${id})`);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/cards/${id}`);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, `cardService.delete(${id})`);
      throw error;
    }
  },

  reorder: async (orderedIds: string[]): Promise<void> => {
    try {
      await api.patch("/cards/reorder", { orderedIds });
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, "cardService.reorder");
      throw error;
    }
  },

  unassignFromProject: async (projectId: string): Promise<void> => {
    try {
      await api.patch(`/cards/project/${projectId}/unassign`);
    } catch (error) {
      const appError = parseAPIError(error);
      logError(appError, `cardService.unassignFromProject(${projectId})`);
      throw error;
    }
  },
};
