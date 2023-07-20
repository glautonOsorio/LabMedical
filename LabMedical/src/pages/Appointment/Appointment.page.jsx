import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";

const Appointment = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Cadastro de Consulta" });
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Appointment;
