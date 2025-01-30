/* eslint-disable react/prop-types */

import OpenMenuButton from "./OpenMenuButton";
import CloseMenuButton from "./CloseMenuButton";
import HomeIcon from "./HomeIcon";
import TodayIcon from "./TodayIcon";
import WeekIcon from "./WeekIcon";
import ProjectsIcon from "./ProjectsIcon";
import DeleteIcon from "./deleteIcon";
import AddIcon from "./AddIcon";
import CancelIcon from "./CancelIcon";
import EditButton from "./EditButton";
import AddNewCardButton from "./AddNewCardButton";

const Icon = ({ name, size = "24", color = "currentColor", ...props }) => {
  const icons = {
    openMenu: OpenMenuButton,
    closeMenu: CloseMenuButton,
    home: HomeIcon,
    today: TodayIcon,
    week: WeekIcon,
    projects: ProjectsIcon,
    deleteProject: DeleteIcon,
    addProjectItem: AddIcon,
    cancelProjectItem: CancelIcon,
    editProjectCard: EditButton,
    addNewCard: AddNewCardButton,
  };

  const IconComponent = icons[name];

  return IconComponent ? <IconComponent size={size} color={color} {...props} /> : null;
};

export default Icon;
