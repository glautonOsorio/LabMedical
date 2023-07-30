import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";
import FormRegister from "../../components/Form/FormRegisterPatient/FormRegisterPatient";

const RegisterPatient = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Cadastro de Paciente" });
  }, []);
  return (
    <div>
      <NavBar />
      <FormRegister />
    </div>
  );
};

export default RegisterPatient;
