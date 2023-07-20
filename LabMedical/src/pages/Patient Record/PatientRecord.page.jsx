import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";

const PatientRecord = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Pontuario de Paciente" });
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default PatientRecord;
