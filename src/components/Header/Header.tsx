import { ChevronRight, EllipsisVertical, LogOut, Search, X } from "lucide-react";
import { useMenu, useUIContext, useLogoutModal } from "@/hooks";
import { setSearchQuery, setPriorityFilter } from "@/actions";
import { PRIORITIES } from "@/constants";
import { Priority } from "@/types";

const Header = () => {
  const { isMenuOpen, searchQuery, priorityFilter, uiDispatch } = useUIContext();
  const { handleMenuVisibilityButton } = useMenu();
  const { handleOpen } = useLogoutModal();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    uiDispatch(setSearchQuery(e.target.value));
  };

  const handleClearSearch = (): void => {
    uiDispatch(setSearchQuery(""));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    uiDispatch(setPriorityFilter(e.target.value as Priority | ""));
  };

  return (
    <header className="header-container">
      <div className="header-content-container">
        <h1>ToDo: Tasks</h1>

        <div className="header-search-wrapper">
          <div className="header-search-input-wrapper">
            <Search size={14} color="#6d737c" strokeWidth={1.5} className="header-search-icon" aria-hidden="true" />
            <input
              className="header-search-input"
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search tasks"
            />
            {searchQuery && (
              <button className="header-search-clear" onClick={handleClearSearch} aria-label="Clear search">
                <X size={13} color="#6d737c" strokeWidth={1.5} />
              </button>
            )}
          </div>

          <select
            className="header-priority-select"
            value={priorityFilter}
            onChange={handlePriorityChange}
            aria-label="Filter by priority"
          >
            <option value="">All</option>
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div className="header-actions">
          <button className="header-logout-button" onClick={handleOpen} aria-label="Sign out">
            <LogOut size={22} color="#e6edf3" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            className="header-menu-button"
            onClick={handleMenuVisibilityButton}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <ChevronRight size={26} color="#e6edf3" strokeWidth={2} aria-hidden="true" />
            ) : (
              <EllipsisVertical size={26} color="#e6edf3" strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
