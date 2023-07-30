import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";
import FormAppointment from "../../components/Form/FormAppointment/FormAppointment";

const Appointment = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Cadastro de Consulta" });
  }, []);
  return (
    <div>
      <NavBar />
      <div>
        <FormAppointment />
      </div>
    </div>
  );
};

export default Appointment;
