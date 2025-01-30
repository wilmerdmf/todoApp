import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { MainContextProvider } from "./context/MainContextProvider.jsx";
import "./main.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </StrictMode>
);
