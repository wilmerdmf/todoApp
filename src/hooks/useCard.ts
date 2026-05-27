import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { Card, Priority, CardFormData } from "@/types";
import { convertToInput, isValidInputFormat, validateCardForm, sanitizeString } from "@/utils";
import { NOTIFICATION_DURATION, PRIORITIES, DEFAULT_PRIORITY } from "@/constants";
import { useNotificationContext, useFormValidation, useCardsQuery } from "@/hooks";

const EMPTY_CARD_DATA: CardFormData = {
  id: "",
  title: "",
  description: "",
  priority: "",
  date: "",
  projectId: "",
};

const useCard = () => {
  const [projectCardData, setProjectCardData] = useState<CardFormData>(EMPTY_CARD_DATA);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { showNotification } = useNotificationContext();
  const { errors, clearError, clearAllErrors, hasErrors, setErrors } = useFormValidation();
  const { createCard, updateCard, deleteCard, isCreating, isUpdating, isDeleting } = useCardsQuery();

  const setCardData = useCallback((cardData: CardFormData) => {
    setProjectCardData(cardData);
  }, []);

  const resetCardData = useCallback(() => {
    setProjectCardData(EMPTY_CARD_DATA);
  }, []);

  const handleDeleteProjectCard = (card: Card): void => {
    deleteCard(card.id);
  };

  const handleProjectCardForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;

    if (errors[name]) {
      clearError(name);
    }

    setProjectCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenCardForm = (): void => {
    clearAllErrors();
    setIsFormOpen(true);
  };

  const handleCloseCardForm = (): void => {
    clearAllErrors();
    resetCardData();
    setIsFormOpen(false);
  };

  const validateAndFormatDateForAPI = (): string => {
    if (!projectCardData.date || projectCardData.date.trim() === "") {
      return "";
    }

    const validation = isValidInputFormat(projectCardData.date);
    if (!validation.isValid) {
      return "";
    }

    return projectCardData.date;
  };

  const getPriority = (): Priority => {
    return (PRIORITIES as readonly string[]).includes(projectCardData.priority)
      ? (projectCardData.priority as Priority)
      : DEFAULT_PRIORITY;
  };

  const handleSendProjectCard = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    clearAllErrors();

    const validation = validateCardForm(projectCardData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstError = Object.values(validation.errors)[0];
      if (firstError) {
        showNotification(firstError, "error", NOTIFICATION_DURATION.MEDIUM);
      }
      return;
    }

    const cardPayload = {
      title: sanitizeString(projectCardData.title),
      description: sanitizeString(projectCardData.description),
      priority: getPriority(),
      date: validateAndFormatDateForAPI(),
      projectId: projectCardData.projectId,
    };

    const cardExists = Boolean(projectCardData.id);

    if (cardExists) {
      updateCard(projectCardData.id, cardPayload);
    } else {
      createCard(cardPayload);
    }

    handleCloseCardForm();
  };

  const handleEditProjectCard = (card: Card): void => {
    clearAllErrors();
    const inputDate = convertToInput(card.date);

    setProjectCardData({
      id: card.id,
      title: card.title,
      description: card.description,
      priority: card.priority,
      date: inputDate,
      projectId: card.projectId,
    });

    setIsFormOpen(true);
  };

  return {
    handleDeleteProjectCard,
    handleOpenCardForm,
    handleCloseCardForm,
    projectCardData,
    setCardData,
    resetCardData,
    isFormOpen,
    handleProjectCardForm,
    handleSendProjectCard,
    handleEditProjectCard,
    isSubmitting: isCreating || isUpdating,
    isDeleting,
    errors,
    hasErrors,
  };
};

export default useCard;
