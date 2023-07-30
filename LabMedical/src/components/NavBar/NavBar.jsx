import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import MedLogo from "../../assets/LABMedical Logo.png";
import { NavContext } from "../../contexts/navbar.context";
import { useNavigate } from "react-router-dom";
import "./NavBar.style.css";

const NavBar = () => {
  const { navData } = useContext(NavContext);
  const [open, setOpen] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
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

  const loggedOut = () => {
    localStorage.removeItem("Logged");
    navigate("/login");
  };
  const Home = () => {
    navigate("/");
  };
  const Register = () => {
    navigate("/register-patient");
  };
  const MeidcalRecords = () => {
    navigate("/medical-records");
  };
  const Appointment = () => {
    navigate("/appointment");
  };
  const Exams = () => {
    navigate("/exams");
  };

  return (
    <div className="navContainer">
      <div className="navToolbar">
        <div className="navLogo">
          <img className="NavToolbarImage" src={MedLogo} alt="Medical Logo" />

          <span className="navMenu" onClick={OpenSidebar}>
            <MenuIcon fontSize="large" />
          </span>
        </div>
        <header className="navToolBarContent">
          <h1> {navData.title} </h1>
          <div>
            {user && (
              <div className="navUser">
                <img className="userImage" src={user.url} alt="perfil" />
                <span> {user.name} </span>
              </div>
            )}
          </div>
        </header>
      </div>

      <div className="sidenav" style={{ width: open }}>
        <img className="sideNavImage" src={MedLogo} alt="Medical Logo" />
        <div className="sideNavCollum">
          <span>Geral</span>
          <Button variant="outlined" type="button" onClick={Home}>
            <BarChartIcon /> Home
          </Button>
          <Button variant="outlined" type="button" onClick={loggedOut}>
            <LogoutIcon /> Sair
          </Button>
        </div>
        <div className="sideNavCollum">
          <span>Pacientes</span>
          <Button variant="outlined" type="button" onClick={Register}>
            <AddIcon /> Cadastrar
          </Button>
          <Button variant="outlined" type="button" onClick={MeidcalRecords}>
            <FormatListBulletedIcon /> Listar Prontuario
          </Button>
        </div>
        <div className="sideNavCollum">
          <span>Exames</span>
          <Button variant="outlined" type="button" onClick={Appointment}>
            <AddIcon /> Cadastrar Consulta
          </Button>
          <Button variant="outlined" type="button" onClick={Exams}>
            <AddIcon /> Cadastrar Exame
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
