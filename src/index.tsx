import App from "./App";
import { createRoot } from "react-dom/client";
import "./assets/app.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
