import Medical from "../../assets/Medical Record Logo.png";
import Lab from "../../assets/lab365 logo.png";
import { FormLogin } from "../../components/Form/FormLogin/FormLogin";
import * as Styled from "./Login.style";

const LoginPage = () => {
  return (
    <Styled.LoginPage>
      <Styled.ImagesCollum>
        <img src={Medical} alt="erro ao carregar" />
        <img src={Lab} alt="erro ao carregar" />
      </Styled.ImagesCollum>
      <FormLogin />
    </Styled.LoginPage>
  );
};

export default LoginPage;
