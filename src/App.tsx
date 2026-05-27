import { useEffect } from "react";
import { useUIContext, useAuthContext, useCard } from "@/hooks";
import {
  Header,
  Menu,
  ProjectCards,
  NewCardButton,
  NewCardForm,
  DeleteProjectModal,
  DeleteCardModal,
  ToastContainer,
  AuthPage,
  LogoutModal,
} from "@/components";
import { UI_TEXT } from "@/constants";

function AuthenticatedApp() {
  const { isMenuOpen } = useUIContext();
  const {
    isFormOpen,
    projectCardData,
    isSubmitting,
    errors,
    hasErrors,
    handleOpenCardForm,
    handleCloseCardForm,
    handleProjectCardForm,
    handleSendProjectCard,
    handleEditProjectCard,
  } = useCard();

  useEffect(() => {
    document.body.classList.toggle("hidden", isMenuOpen);
  }, [isMenuOpen]);

  return (
    <>
      <Header />
      <div className="main-content-container">
        <Menu />
        <div className={`general-container ${isMenuOpen ? "hidden" : ""}`}>
          <ProjectCards onEditCard={handleEditProjectCard} />
          <NewCardButton onOpen={handleOpenCardForm} />
          <NewCardForm
            isFormOpen={isFormOpen}
            projectCardData={projectCardData}
            isSubmitting={isSubmitting}
            errors={errors}
            hasErrors={hasErrors}
            onClose={handleCloseCardForm}
            onChange={handleProjectCardForm}
            onSubmit={handleSendProjectCard}
          />
        </div>
      </div>
      <DeleteProjectModal />
      <DeleteCardModal />
      <LogoutModal />
      <ToastContainer />
    </>
  );
}

function App() {
  const { isAuthenticated, isAuthLoading } = useAuthContext();

  if (isAuthLoading) {
    return (
      <div className="fullscreen-center loading-screen">
        <div>{UI_TEXT.LOADING}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  return <AuthenticatedApp />;
}

export default App;
