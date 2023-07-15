import Medical from "../../assets/Medical Record Logo.png";
import Lab from "../../assets/lab365 logo.png";
import { FormLogin } from "../../components/Form/FormLogin/FormLogin";
import "./Login.style.css";

const LoginPage = () => {
  return (
    <div className="loginContainer">
      <div className="loginImageCollum">
        <img src={Medical} alt="erro ao carregar" />
        <img className="loginImage" src={Lab} alt="erro ao carregar" />
      </div>
      <FormLogin />
    </div>
  );
};

export default LoginPage;
