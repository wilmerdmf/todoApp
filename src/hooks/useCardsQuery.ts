import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cardService } from "@/services";
import { useNotificationContext, useApiError } from "@/hooks";
import { NOTIFICATION_MESSAGES, NOTIFICATION_DURATION } from "@/constants";
import { Card } from "@/types";

type CardPayload = Omit<Card, "id" | "order">;

export const CARDS_QUERY_KEY = ["cards"];

export const useCardsQuery = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotificationContext();
  const { handleError } = useApiError();

  const cardsQuery = useQuery({
    queryKey: CARDS_QUERY_KEY,
    queryFn: cardService.getAll,
  });

  useEffect(() => {
    if (cardsQuery.isError) {
      handleError(cardsQuery.error, NOTIFICATION_MESSAGES.CARDS_FETCH_ERROR);
    }
  }, [cardsQuery.isError]);

  const createMutation = useMutation({
    mutationFn: (card: CardPayload) => cardService.create(card),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
      showNotification(NOTIFICATION_MESSAGES.CARD_CREATED, "success", NOTIFICATION_DURATION.SHORT);
    },
    onError: (error) => {
      handleError(error, NOTIFICATION_MESSAGES.CARD_CREATE_ERROR);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, card }: { id: string; card: CardPayload }) => cardService.update(id, card),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
      showNotification(NOTIFICATION_MESSAGES.CARD_UPDATED, "success", NOTIFICATION_DURATION.SHORT);
    },
    onError: (error) => {
      handleError(error, NOTIFICATION_MESSAGES.CARD_UPDATE_ERROR);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => cardService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
      showNotification(NOTIFICATION_MESSAGES.CARD_DELETED, "success", NOTIFICATION_DURATION.SHORT);
    },
    onError: (error) => {
      handleError(error, NOTIFICATION_MESSAGES.CARD_DELETE_ERROR);
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (orderedIds: string[]) => cardService.reorder(orderedIds),
    onMutate: async (orderedIds) => {
      await queryClient.cancelQueries({ queryKey: CARDS_QUERY_KEY });

      const previousCards = queryClient.getQueryData<Card[]>(CARDS_QUERY_KEY);

      queryClient.setQueryData<Card[]>(CARDS_QUERY_KEY, (old) => {
        if (!old) return old;
        const cardMap = new Map(old.map((c) => [c.id, c]));
        return orderedIds
          .map((id, index) => {
            const card = cardMap.get(id);
            return card ? { ...card, order: index } : null;
          })
          .filter(Boolean) as Card[];
      });

      return { previousCards };
    },
    onError: (error, _orderedIds, context) => {
      if (context?.previousCards) {
        queryClient.setQueryData(CARDS_QUERY_KEY, context.previousCards);
      }
      handleError(error, "Error reordering cards");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
    },
  });

  return {
    cards: cardsQuery.data ?? [],
    isLoading: cardsQuery.isLoading,
    isError: cardsQuery.isError,
    createCard: (card: CardPayload) => createMutation.mutate(card),
    isCreating: createMutation.isPending,
    updateCard: (id: string, card: CardPayload) => updateMutation.mutate({ id, card }),
    isUpdating: updateMutation.isPending,
    deleteCard: (id: string) => deleteMutation.mutate(id),
    isDeleting: deleteMutation.isPending,
    reorderCards: (orderedIds: string[]) => reorderMutation.mutate(orderedIds),
    isReordering: reorderMutation.isPending,
  };
};
