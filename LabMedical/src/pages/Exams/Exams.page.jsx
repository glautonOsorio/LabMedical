import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";

const Exams = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Cadastro de Exame" });
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Exams;
