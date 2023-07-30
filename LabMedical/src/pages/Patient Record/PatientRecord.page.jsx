import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";
import PatientRecords from "../../components/PatientRecord/PatientRecord";

const PatientRecord = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Pontuario de Paciente" });
  }, []);
  return (
    <div>
      <NavBar />
      <PatientRecords />
    </div>
  );
};

export default PatientRecord;
