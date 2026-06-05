import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useDeleteProjectModal, useFocusTrap } from "@/hooks";

const DeleteProjectModal = () => {
  const { deleteProjectModal, isDeleting, handleClose, handleDeleteWithCards, handleUnassignCards } =
    useDeleteProjectModal();

  const isOpen = Boolean(deleteProjectModal);
  const containerRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!deleteProjectModal) return null;

  const { projectName, affectedCardsCount } = deleteProjectModal;

  return (
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div
        ref={containerRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-button" onClick={handleClose} disabled={isDeleting} aria-label="Close modal">
          <X size={24} color="#e6edf3" strokeWidth={1.5} />
        </button>

        <div className="modal-header">
          <AlertTriangle size={48} color="#f39c12" strokeWidth={1.5} aria-hidden="true" />
          <h2 id="delete-modal-title">Delete Project?</h2>
        </div>

        <div className="modal-body">
          <p>
            You are about to delete <strong>{projectName}</strong>.
          </p>
          <p className="warning-text">
            This project has <strong>{affectedCardsCount}</strong> {affectedCardsCount === 1 ? "task" : "tasks"}{" "}
            associated with it.
          </p>
          <p>What would you like to do with these tasks?</p>
        </div>

        <div className="modal-actions">
          <button className="button-secondary" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </button>

          <button className="button-warning" onClick={handleUnassignCards} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Keep Tasks (Unassign)"}
          </button>

          <button className="button-danger" onClick={handleDeleteWithCards} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Everything"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
