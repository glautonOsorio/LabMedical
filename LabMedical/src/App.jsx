import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login.page";
import HomePage from "./pages/Home/Home.page";
import Register from "./pages/Register/Register.page";
import "./App.css";
import NotFound from "./pages/Not Found/NotFound.page";
import Appointment from "./pages/Appointment/Appointment.page";
import Exams from "./pages/Exams/Exams.page";
import MedicalRecord from "./pages/Medical Record/MedicalRecord.page";
import PatientRecord from "./pages/Patient Record/PatientRecord.page";
import RegisterPatient from "./pages/RegisterPatient/RegisterPatient.page";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/medical-records" element={<MedicalRecord />} />
          <Route path="/patient-records" element={<PatientRecord />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
