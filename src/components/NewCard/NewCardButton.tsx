import { CirclePlus } from "lucide-react";

interface NewCardButtonProps {
  onOpen: () => void;
}

const NewCardButton = ({ onOpen }: NewCardButtonProps) => {
  return (
    <button className="add-new-card-button" onClick={onOpen}>
      <CirclePlus size={38} color="#e6edf3" strokeWidth={2} />
    </button>
  );
};

export default NewCardButton;
