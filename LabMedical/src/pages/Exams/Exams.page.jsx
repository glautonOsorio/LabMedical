import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";
import FormExams from "../../components/Form/FormExams/FormExams";

const Exams = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Cadastro de Exame" });
  }, []);
  return (
    <div>
      <NavBar />
      <div>
        <FormExams />
      </div>
    </div>
  );
};

export default Exams;
