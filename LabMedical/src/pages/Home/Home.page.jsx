import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { Navigate } from "react-router-dom";

export const HomePage = () => {
  const { auth } = useContext(AuthContext);

  const render = () => {
    return (
      <>
        <p>HomePage is Render</p>
      </>
    );
  };
  return auth.isLogged ? render() : <Navigate to="/login" />;
};

export default HomePage;
