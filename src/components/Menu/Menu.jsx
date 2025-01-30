import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import Icon from "../../icons/Icon";
import NewProjectItemForm from "./NewProjectItemForm";
import AddProjectItemButton from "./AddProjectItemButton";
import useMenu from "../../hooks/useMenu";
import useProjectList from "../../hooks/useProjectList";

const Menu = () => {
  const { isMenuOpen, projectList, isProjectFormActive } = useContext(MainContext);
  const { activeMenuOption, handleSelectedMenuOption } = useMenu();
  const { handleDeleteProject } = useProjectList();

  return (
    <section className={`menu-container ${isMenuOpen ? "is-active" : ""}`}>
      <div className="menu-width-container">
        <button
          className={`menu-option-button ${activeMenuOption === "home" ? "is-active" : ""}`}
          onClick={() => handleSelectedMenuOption("home")}
        >
          <Icon name="home" size="24" color="#dfe6e9" />
          <h2>Home</h2>
        </button>

        <button
          className={`menu-option-button ${activeMenuOption === "today" ? "is-active" : ""}`}
          onClick={() => handleSelectedMenuOption("today")}
        >
          <Icon name="today" size="24" color="#dfe6e9" />
          <h2>Today</h2>
        </button>

        <button
          className={`menu-option-button ${activeMenuOption === "week" ? "is-active" : ""}`}
          onClick={() => handleSelectedMenuOption("week")}
        >
          <Icon name="week" size="24" color="#dfe6e9" />
          <h2>Week</h2>
        </button>

        <div className="menu-option-container">
          <Icon name="projects" size="24" color="#dfe6e9" />
          <h2>Projects</h2>
        </div>

        <ul className="project-list">
          {projectList.map((project) => (
            <li key={project.projectName} id={project.id}>
              {project.projectName}
              <button onClick={() => handleDeleteProject(project.projectName)}>
                <Icon name="deleteProject" size="18" color="#dfe6e9" />
              </button>
            </li>
          ))}
        </ul>

        {isProjectFormActive ? <NewProjectItemForm /> : <AddProjectItemButton />}
      </div>
    </section>
  );
};

export default Menu;
