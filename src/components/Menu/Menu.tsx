import { CalendarCheck, CalendarDays, ChartNoAxesGantt, House, Trash, FolderOpen } from "lucide-react";
import NewProjectItemForm from "./NewProjectItemForm";
import AddProjectItemButton from "./AddProjectItemButton";
import { useMenu, useProjectList, useUIContext, useProjectsQuery, useCardsQuery } from "@/hooks";

const ProjectsSkeleton = () => (
  <ul className="project-list">
    {Array.from({ length: 3 }).map((_, i) => (
      <li key={i} className="project-skeleton">
        <div className="skeleton-line skeleton-project-name" />
      </li>
    ))}
  </ul>
);

const Menu = () => {
  const { isMenuOpen } = useUIContext();
  const { projects, isLoading } = useProjectsQuery();
  const { cards } = useCardsQuery();
  const { activeMenuOption, handleSelectedMenuOption } = useMenu();
  const {
    isProjectFormActive,
    handleDeleteProject,
    handleOpenNewProjectForm,
    handleCloseNewProjectForm,
    handleAddNewProject,
    handleNewProjectInput,
    newProjectName,
    isSubmitting,
    errors,
  } = useProjectList();

  const getCardCount = (projectId: string): number => cards.filter((card) => card.projectId === projectId).length;

  return (
    <section className={`menu-container ${isMenuOpen ? "is-active" : ""}`} aria-label="Main navigation">
      <div className="menu-width-container">
        <button
          className={`menu-option-button ${activeMenuOption === "home" ? "is-active" : ""}`}
          onClick={() => handleSelectedMenuOption("home")}
          aria-current={activeMenuOption === "home" ? "page" : undefined}
        >
          <House size={22} color="#e6edf3" strokeWidth={1.5} aria-hidden="true" />
          <span>Home</span>
        </button>

        <button
          className={`menu-option-button ${activeMenuOption === "today" ? "is-active" : ""}`}
          onClick={() => handleSelectedMenuOption("today")}
          aria-current={activeMenuOption === "today" ? "page" : undefined}
        >
          <CalendarCheck size={22} color="#e6edf3" strokeWidth={1.5} aria-hidden="true" />
          <span>Today</span>
        </button>

        <button
          className={`menu-option-button ${activeMenuOption === "week" ? "is-active" : ""}`}
          onClick={() => handleSelectedMenuOption("week")}
          aria-current={activeMenuOption === "week" ? "page" : undefined}
        >
          <CalendarDays size={22} color="#e6edf3" strokeWidth={1.5} aria-hidden="true" />
          <span>Week</span>
        </button>

        <div className="menu-option-container" aria-hidden="true">
          <ChartNoAxesGantt size={22} color="#e6edf3" strokeWidth={1.5} aria-hidden="true" />
          <span>Projects</span>
        </div>

        {isLoading ? (
          <ProjectsSkeleton />
        ) : (
          <ul className="project-list" aria-label="Projects">
            {projects.length > 0 ? (
              projects.map((project) => {
                const cardCount = getCardCount(project.id);
                const isActive = activeMenuOption === `project:${project.id}`;
                return (
                  <li
                    key={project.id}
                    id={project.id}
                    className={isActive ? "is-active" : ""}
                    onClick={() => handleSelectedMenuOption(`project:${project.id}`)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="project-name">{project.projectName}</span>
                    <div className="project-list-actions">
                      {cardCount > 0 && (
                        <span className="project-card-count" aria-label={`${cardCount} tasks`}>
                          {cardCount}
                        </span>
                      )}
                      <button
                        aria-label={`Delete project ${project.projectName}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id, project.projectName);
                        }}
                      >
                        <Trash size={16} color="#e6edf3" strokeWidth={1} aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="project-list-empty">
                <FolderOpen size={16} strokeWidth={1} color="#6d737c" aria-hidden="true" />
                <span>No projects yet</span>
              </li>
            )}
          </ul>
        )}

        {isProjectFormActive ? (
          <NewProjectItemForm
            newProjectName={newProjectName}
            onInput={handleNewProjectInput}
            onSubmit={handleAddNewProject}
            onClose={handleCloseNewProjectForm}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        ) : (
          <AddProjectItemButton onOpen={handleOpenNewProjectForm} />
        )}
      </div>
    </section>
  );
};

export default Menu;
