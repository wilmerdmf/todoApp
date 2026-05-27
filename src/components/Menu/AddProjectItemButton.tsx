interface AddProjectItemButtonProps {
  onOpen: () => void;
}

const AddProjectItemButton = ({ onOpen }: AddProjectItemButtonProps) => {
  return (
    <div className="add-new-project-button-container">
      <button onClick={onOpen}>Add new project</button>
    </div>
  );
};

export default AddProjectItemButton;
