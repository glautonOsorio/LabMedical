import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/auth.context.jsx";
import { NavProvider } from "./contexts/navbar.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NavProvider>
        <App />
      </NavProvider>
    </AuthProvider>
  </React.StrictMode>
);
