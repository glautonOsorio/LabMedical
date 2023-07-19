import { useContext, useState } from "react";
import MedLogo from "../../assets/LABMedical Logo.png";
import "./NavBar.style.css";
import { NavContext } from "../../contexts/navbar.context";

const NavBar = () => {
  const { navData } = useContext(NavContext);
  const [open, setOpen] = useState();

  function OpenSidebar() {
    if (open) {
      setOpen();
    } else {
      setOpen("18rem");
    }
  }
  return (
    <div className="navContainer">
      <div className="navToolbar">
        <div className="navLogo">
          <img className="sideNavImage" src={MedLogo} alt="Medical Logo" />

          <span className="navMenu" onClick={OpenSidebar}>
            Menu
          </span>
        </div>
        <header className="navToolBarContent">
          <h1> {navData.title} </h1>
          <div>
            <span> coisa</span>
            <span> Imagem Sexy</span>
          </div>
        </header>
      </div>

      <div className="sidenav" style={{ width: open }}>
        <a className="closebtn" onClick={OpenSidebar}>
          Fechar
        </a>
        <img className="sideNavImage" src={MedLogo} alt="Medical Logo" />
        <a>About</a>
        <a>Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    </div>
  );
};

export default NavBar;
