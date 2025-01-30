import { useContext, useEffect } from "react";
import { MainContext } from "./context/MainContext";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import ProjectCards from "./components/ProjectCards/ProjectCards";
import NewCardButton from "./components/NewCard/NewCardButton";
import NewCardForm from "./components/NewCard/NewCardForm";

function App() {
  const { isMenuOpen } = useContext(MainContext);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  }, [isMenuOpen]);

  return (
    <>
      <Header />
      <div className="main-content-container">
        <Menu />
        <div className={`general-container ${isMenuOpen ? "hidden" : ""}`}>
          <ProjectCards />
          <NewCardButton />
          <NewCardForm />
        </div>
      </div>
    </>
  );
}

export default App;
