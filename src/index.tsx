import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App";
import PreferredBreeds from "./pages/PreferredBreeds";

const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/favorites" element={<PreferredBreeds />} />
      </Routes>
    </Router>
  </StrictMode>
);