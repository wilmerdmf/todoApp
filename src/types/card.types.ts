import { Priority } from "./index";

export interface Card {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  date: string;
  projectId: string;
  order: number;
}

export interface CardFormData {
  id: string;
  title: string;
  description: string;
  priority: Priority | "";
  date: string;
  projectId: string;
}

export interface CardProps {
  card: Card;
}
