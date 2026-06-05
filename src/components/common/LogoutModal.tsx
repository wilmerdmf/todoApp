import { useEffect } from "react";
import { LogOut, X } from "lucide-react";
import { useLogoutModal, useFocusTrap } from "@/hooks";

const LogoutModal = () => {
  const { isLogoutModalOpen, handleClose, handleConfirm } = useLogoutModal();
  const containerRef = useFocusTrap(isLogoutModalOpen);

  useEffect(() => {
    if (!isLogoutModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLogoutModalOpen, handleClose]);

  if (!isLogoutModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose} role="presentation">
      <div
        ref={containerRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-button" onClick={handleClose} aria-label="Close modal">
          <X size={24} color="#e6edf3" strokeWidth={1.5} />
        </button>

        <div className="modal-header">
          <LogOut size={48} color="#3c8aff" strokeWidth={1.5} aria-hidden="true" />
          <h2 id="logout-modal-title">Sign out?</h2>
        </div>

        <div className="modal-body">
          <p>Are you sure you want to sign out of your account?</p>
        </div>

        <div className="modal-actions">
          <button className="button-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="button-danger" onClick={handleConfirm}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
