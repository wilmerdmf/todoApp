/* eslint-disable react/prop-types */

const DeleteIcon = (props) => (
  <svg
    width={props.size || "24"}
    height={props.size || "24"}
    viewBox="0 0 24 24"
    fill={props.color || "currentColor"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
  </svg>
);

export default DeleteIcon;
