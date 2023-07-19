import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { Navigate } from "react-router-dom";
import "./Home.style.css";
import NavBar from "../../components/NavBar/NavBar";
import { NavContext } from "../../contexts/navbar.context";

export const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const loggedUser = localStorage.getItem("Logged");
  const { setNavData } = useContext(NavContext);

  useEffect(() => {
    setNavData({ title: "Estatiscas e Informações" });
  }, []);

  const render = () => {
    return (
      <div className="homeContainer">
        <NavBar />
        <div className="homeCardContainers">Farofa</div>
      </div>
    );
  };
  return loggedUser || auth.isLogged ? render() : <Navigate to="/login" />;
};

export default HomePage;
