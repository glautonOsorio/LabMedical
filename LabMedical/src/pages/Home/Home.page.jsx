import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { Navigate } from "react-router-dom";
import "./Home.style.css";

export const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const loggedUser = localStorage.getItem("Logged");

  const [abrir, setAbrir] = useState();

  function abrirPokebola() {
    if (abrir) {
      setAbrir();
    } else {
      setAbrir("18rem");
    }
  }

  const render = () => {
    return (
      <div>
        <div className="sidenav" style={{ width: abrir }}>
          <a className="closebtn" onClick={abrirPokebola}>
            &times;
          </a>
          <a>About</a>
          <a>Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>

        <span onClick={abrirPokebola}>open</span>
      </div>
    );
  };
  return loggedUser || auth.isLogged ? render() : <Navigate to="/login" />;
};

export default HomePage;
