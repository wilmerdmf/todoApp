import useCard from "../../hooks/useCard";
import Icon from "../../icons/Icon";

const NewCardButton = () => {
  const { handleOpenCardForm } = useCard();

  return (
    <button className="add-new-card-button" onClick={handleOpenCardForm}>
      <Icon name="addNewCard" size="50" color="#172431" />
    </button>
  );
};

export default NewCardButton;
