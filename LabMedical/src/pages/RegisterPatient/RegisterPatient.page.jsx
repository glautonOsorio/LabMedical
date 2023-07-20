import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";

const RegisterPatient = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Cadastro de Paciente" });
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default RegisterPatient;
