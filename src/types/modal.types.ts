export interface DeleteProjectModalData {
  projectId: string;
  projectName: string;
  affectedCardsCount: number;
}

export type DeleteProjectAction = "cancel" | "delete-cards" | "unassign-cards";

export interface DeleteCardModalData {
  cardId: string;
  cardTitle: string;
}
