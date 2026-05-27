import { useAuthContext, useUIContext } from "@/hooks";
import { setLogoutModal } from "@/actions";

const useLogoutModal = () => {
  const { logout } = useAuthContext();
  const { isLogoutModalOpen, uiDispatch } = useUIContext();

  const handleOpen = (): void => {
    uiDispatch(setLogoutModal(true));
  };

  const handleClose = (): void => {
    uiDispatch(setLogoutModal(false));
  };

  const handleConfirm = (): void => {
    logout();
    uiDispatch(setLogoutModal(false));
  };

  return {
    isLogoutModalOpen,
    handleOpen,
    handleClose,
    handleConfirm,
  };
};

export default useLogoutModal;
