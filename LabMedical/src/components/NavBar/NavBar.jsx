import { useContext, useEffect, useState } from "react";
import MedLogo from "../../assets/LABMedical Logo.png";
import "./NavBar.style.css";
import { NavContext } from "../../contexts/navbar.context";
import { UserService } from "../../Services/Users/Users.service";

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
