import { useUIContext, useCardsQuery } from "@/hooks";
import { setDeleteCardModal } from "@/actions";

const useDeleteCardModal = () => {
  const { deleteCardModal, uiDispatch } = useUIContext();
  const { deleteCard, isDeleting } = useCardsQuery();

  const handleClose = (): void => {
    uiDispatch(setDeleteCardModal(null));
  };

  const handleConfirmDelete = (): void => {
    if (!deleteCardModal) return;

    deleteCard(deleteCardModal.cardId);
    uiDispatch(setDeleteCardModal(null));
  };

  return {
    deleteCardModal,
    isDeleting,
    handleClose,
    handleConfirmDelete,
  };
};

export default useDeleteCardModal;
