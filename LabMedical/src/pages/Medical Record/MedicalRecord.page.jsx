import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";

const MedicalRecord = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Listagem de Pontuarios" });
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default MedicalRecord;
