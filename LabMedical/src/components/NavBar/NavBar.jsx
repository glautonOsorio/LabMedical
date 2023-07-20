import { useContext, useEffect, useState } from "react";
import MedLogo from "../../assets/LABMedical Logo.png";
import "./NavBar.style.css";
import { NavContext } from "../../contexts/navbar.context";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { navData } = useContext(NavContext);
  const [open, setOpen] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    let email = localStorage.getItem("Logged");
    fetch(`http://localhost:3000/users?email=${email}`).then(
      async (response) => {
        const data = await response.json();
        setUser(data[0]);
      }
    );
  }, []);

  function OpenSidebar() {
    if (open) {
      setOpen();
    } else {
      setOpen("20rem");
    }
  }

  return (
    <div className="navContainer">
      <div className="navToolbar">
        <div className="navLogo">
          <img className="NavToolbarImage" src={MedLogo} alt="Medical Logo" />

          <span className="navMenu" onClick={OpenSidebar}>
            Menu
          </span>
        </div>
        <header className="navToolBarContent">
          <h1> {navData.title} </h1>
          <div>
            {user && (
              <div className="navUser">
                <span> {user.name} </span>
                <img className="userImage" src={user.URL} alt="erro" />
              </div>
            )}
          </div>
        </header>
      </div>

      <div className="sidenav" style={{ width: open }}>
        <img className="sideNavImage" src={MedLogo} alt="Medical Logo" />
        <div className="sideNavCollum">
          <span>Geral</span>
          <button>
            <Link to={"/"}>Home</Link>
          </button>
          <button>Sair</button>
        </div>
        <div className="sideNavCollum">
          <span>Pacientes</span>
          <button>
            <Link to={"/register-patient"}>Cadastrar</Link>
          </button>
          <button>
            <Link to={"/medical-records"}>Listar Prontuario</Link>
          </button>
        </div>
        <div className="sideNavCollum">
          <span>Exames</span>
          <button>
            <Link to={"/appointment"}>Cadastrar Consulta</Link>
          </button>
          <button>
            <Link to={"/exams"}>Cadastrar Exame</Link>
          </button>
        </div>
        <a className="closebtn" onClick={OpenSidebar}>
          Fechar
        </a>
      </div>
    </div>
  );
};

export default NavBar;
