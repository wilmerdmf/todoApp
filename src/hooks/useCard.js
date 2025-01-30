import { useContext } from "react";
import { MainContext } from "../context/MainContext";

const useCard = (card) => {
  const { projectCardList, setProjectCardList, setIsFormOpen, projectCardData, setProjectCardData } =
    useContext(MainContext);

  //! Delete project card handler
  const handleDeleteProjectCard = () => {
    const newProjectCardList = projectCardList.filter((projectCardToDelete) => projectCardToDelete.id !== card.id);

    setProjectCardList(newProjectCardList);
  };

  //! New project card form handler
  const handleProjectCardForm = (e) => {
    const { name, value } = e.target;
    setProjectCardData({ ...projectCardData, [name]: value });
  };

  //! Open new project card form handler
  const handleOpenCardForm = () => {
    setIsFormOpen(true);
  };

  //! Close new project card form handler
  const handleCloseCardForm = () => {
    setIsFormOpen(false);
  };

  //! Submit / Edit project card handler
  const handleSendProjectCard = (e) => {
    e.preventDefault();
    if (!projectCardData.title.trim()) return;

    const formatDate = (date) => {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      const formatDate = `${month}/${day}/${year}`;
      return formatDate;
    };

    const newCard = {
      ...projectCardData,
      id: projectCardData.id || Date.now() + "-" + Math.random().toString(36).substring(2, 9),
      date: formatDate(projectCardData.date),
    };

    setProjectCardList((prevCardList) =>
      prevCardList.some((card) => card.id === newCard.id)
        ? prevCardList.map((card) => (card.id === newCard.id ? newCard : card))
        : [...prevCardList, newCard]
    );

    setProjectCardData({
      id: "",
      title: "",
      description: "",
      priority: "",
      date: "",
      projectId: "",
    });

    handleCloseCardForm();
  };

  //! Edit project card handler
  const handleEditProjectCard = () => {
    const actualFormatDate = (date) => {
      if (!date || date === "no date") return "";
      const [month, day, year] = date.split("/");
      const formatDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      return formatDate;
    };

    setProjectCardData({
      id: card.id,
      title: card.title,
      description: card.description,
      priority: card.priority,
      date: actualFormatDate(card.date),
      projectId: card.projectId,
    });

    handleOpenCardForm();
  };

  return {
    handleDeleteProjectCard,
    handleOpenCardForm,
    handleCloseCardForm,
    projectCardData,
    setProjectCardData,
    handleProjectCardForm,
    handleSendProjectCard,
    handleEditProjectCard,
  };
};

export default useCard;
