import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const NavContext = createContext({
  navData: { title: "", subTitle: "" },
  setNavData: () => {},
});

export const NavProvider = ({ children }) => {
  const [navData, setNavData] = useState({
    title: "Bem Vindo",
  });

  return (
    <NavContext.Provider value={{ navData, setNavData }}>
      {children}
    </NavContext.Provider>
  );
};

NavProvider.propTypes = {
  children: PropTypes.node,
};
