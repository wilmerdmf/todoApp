import { MenuOption } from "@/types";
import { setMenuOpen, setActiveMenuOption } from "@/actions";
import { useUIContext } from "@/hooks";

const useMenu = () => {
  const { isMenuOpen, activeMenuOption, uiDispatch } = useUIContext();

  const handleMenuVisibilityButton = (): void => {
    uiDispatch(setMenuOpen(!isMenuOpen));
  };

  const handleSelectedMenuOption = (button: MenuOption): void => {
    uiDispatch(setActiveMenuOption(button));
    uiDispatch(setMenuOpen(false));
  };

  return {
    handleMenuVisibilityButton,
    activeMenuOption,
    handleSelectedMenuOption,
  };
};

export default useMenu;
