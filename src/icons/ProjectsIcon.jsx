/* eslint-disable react/prop-types */

const ProjectsIcon = (props) => (
  <svg
    width={props.size || "24"}
    height={props.size || "24"}
    viewBox="0 0 24 24"
    fill={props.color || "currentColor"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5 5V19H7V21H3V3H7V5H5M20 7H7V9H20V7M20 11H7V13H20V11M20 15H7V17H20V15Z" />
  </svg>
);

export default ProjectsIcon;
