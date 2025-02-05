/* eslint-disable react/prop-types */

const AddNewCardButton = (props) => (
  <svg
    width={props.size || "24"}
    height={props.size || "24"}
    viewBox="0 0 24 24"
    fill={props.color || "currentColor"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);

export default AddNewCardButton;
