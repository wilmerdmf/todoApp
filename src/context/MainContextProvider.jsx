/* eslint-disable react/prop-types */

import { useState } from "react";
import { MainContext } from "./MainContext";

export function MainContextProvider({ children }) {
  //! Menu visibility State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //! New project form visibility state
  const [isProjectFormActive, setIsProjectFormActive] = useState(false);

  //! New toDo card form visibility state
  const [isFormOpen, setIsFormOpen] = useState(false);

  //! Menu selected option state
  const [activeMenuOption, setActiveMenuOption] = useState("home");

  //! Project list state
  const [projectList, setProjectList] = useState([
    {
      projectName: "Momma's Birthday",
      id: "7c1b3a5f-2d8e-4a9c-bf12-6a3d4e5f7g8h",
    },
    {
      projectName: "School",
      id: "a3f9b8c2-5e1d-4f7a-8c3b-9d2e1f4a5b6c",
    },
    {
      projectName: "Gym",
      id: "4d5e6f7a-8b9c-1d2e-3f4a-5b6c7d8e9f0a",
    },
  ]);

  //! toDo cards list state
  const [projectCardList, setProjectCardList] = useState([
    {
      id: Date.now() + "-" + Math.random().toString(36).substring(2, 9),
      title: "Get some balloons",
      description: "Gotta get some ballons for momma's birthday",
      priority: "Medium",
      date: "01/28/2025",
      projectId: "7c1b3a5f-2d8e-4a9c-bf12-6a3d4e5f7g8h",
    },
    {
      id: Date.now() + "-" + Math.random().toString(36).substring(2, 9),
      title: "Study for exam",
      description: "I have an exam on Monday",
      priority: "Important",
      date: "01/31/2025",
      projectId: "a3f9b8c2-5e1d-4f7a-8c3b-9d2e1f4a5b6c",
    },
    {
      id: Date.now() + "-" + Math.random().toString(36).substring(2, 9),
      title: "Buy gym stuff",
      description: "Need some shorts and tshirts for gym",
      priority: "Chill",
      date: "02/11/2025",
      projectId: "4d5e6f7a-8b9c-1d2e-3f4a-5b6c7d8e9f0a",
    },
  ]);

  //! New project card data state
  const [projectCardData, setProjectCardData] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    date: "",
    projectId: "",
  });

  //! State provider
  const state = {
    isMenuOpen,
    setIsMenuOpen,
    projectList,
    setProjectList,
    projectCardList,
    setProjectCardList,
    isProjectFormActive,
    setIsProjectFormActive,
    isFormOpen,
    setIsFormOpen,
    projectCardData,
    setProjectCardData,
    activeMenuOption,
    setActiveMenuOption,
  };

  return <MainContext.Provider value={state}>{children}</MainContext.Provider>;
}
