import { useUIContext, useProjectsQuery } from "@/hooks";
import { setDeleteProjectModal } from "@/actions";

const useDeleteProjectModal = () => {
  const { deleteProjectModal, uiDispatch } = useUIContext();

  const { deleteProjectWithCards, deleteProjectAndUnassign, isDeletingWithCards, isDeletingAndUnassigning } =
    useProjectsQuery();

  const handleClose = (): void => {
    uiDispatch(setDeleteProjectModal(null));
  };

  const handleDeleteWithCards = (): void => {
    if (!deleteProjectModal) return;

    deleteProjectWithCards(deleteProjectModal.projectId, {
      onSuccess: () => handleClose(),
    });
  };

  const handleUnassignCards = (): void => {
    if (!deleteProjectModal) return;

    deleteProjectAndUnassign(deleteProjectModal.projectId, {
      onSuccess: () => handleClose(),
    });
  };

  return {
    deleteProjectModal,
    isDeleting: isDeletingWithCards || isDeletingAndUnassigning,
    handleClose,
    handleDeleteWithCards,
    handleUnassignCards,
  };
};

export default useDeleteProjectModal;
