import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useDeleteCardModal, useFocusTrap } from "@/hooks";

const DeleteCardModal = () => {
  const { deleteCardModal, isDeleting, handleClose, handleConfirmDelete } = useDeleteCardModal();

  const isOpen = Boolean(deleteCardModal);
  const containerRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!deleteCardModal) return null;

  const { cardTitle } = deleteCardModal;

  return (
    <div className="modal-overlay" onClick={handleClose} aria-hidden="true">
      <div
        ref={containerRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-card-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-button" onClick={handleClose} disabled={isDeleting} aria-label="Close modal">
          <X size={24} color="#e6edf3" strokeWidth={1.5} />
        </button>

        <div className="modal-header">
          <AlertTriangle size={48} color="#f39c12" strokeWidth={1.5} aria-hidden="true" />
          <h2 id="delete-card-modal-title">Delete Task?</h2>
        </div>

        <div className="modal-body">
          <p>
            You are about to delete <strong>{cardTitle}</strong>.
          </p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>

        <div className="modal-actions">
          <button className="button-secondary" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </button>

          <button className="button-danger" onClick={handleConfirmDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCardModal;
