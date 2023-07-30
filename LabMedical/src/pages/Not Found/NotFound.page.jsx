import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";

const NotFound = () => {
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Pagina Não Encontrada" });
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default NotFound;
