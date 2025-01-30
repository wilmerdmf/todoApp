import { useContext } from "react";
import { MainContext } from "../context/MainContext";

const useMenu = () => {
  //! Menu visibility state
  const { isMenuOpen, setIsMenuOpen, activeMenuOption, setActiveMenuOption } = useContext(MainContext);

  //! Menu visibility button handler
  const handleMenuVisibilityButton = () => {
    if (isMenuOpen) return setIsMenuOpen(false);
    setIsMenuOpen(true);
  };

  //! Menu selected option handler
  const handleSelectedMenuOption = (button) => {
    setActiveMenuOption(button);
    setIsMenuOpen(false);
  };

  return {
    handleMenuVisibilityButton,
    activeMenuOption,
    handleSelectedMenuOption,
  };
};

export default useMenu;
