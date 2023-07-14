import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/Login/Login.page";
import HomePage from "./pages/Home/Home.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
