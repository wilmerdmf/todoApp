import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import Icon from "../../icons/Icon";
import useMenu from "../../hooks/useMenu";

const Header = () => {
  const { isMenuOpen } = useContext(MainContext);
  const { handleMenuVisibilityButton } = useMenu();

  return (
    <header className="header-container">
      <div className="header-content-container">
        <h1>ToDo: Tasks</h1>
        <button onClick={handleMenuVisibilityButton}>
          {isMenuOpen ? (
            <Icon name="closeMenu" size="28" color="#dfe6e9" />
          ) : (
            <Icon name="openMenu" size="28" color="#dfe6e9" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
