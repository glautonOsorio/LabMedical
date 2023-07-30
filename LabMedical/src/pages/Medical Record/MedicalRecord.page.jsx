import { useContext, useEffect } from "react";
import { NavContext } from "../../contexts/navbar.context";
import NavBar from "../../components/NavBar/NavBar";
import MedicalRecords from "../../components/MedicalRecords/MedicalRecords";

const MedicalRecord = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Listagem de Pontuarios" });
  }, []);
  return (
    <div>
      <NavBar />
      <MedicalRecords />
    </div>
  );
};

export default MedicalRecord;
