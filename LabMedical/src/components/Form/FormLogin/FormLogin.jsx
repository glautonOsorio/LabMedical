import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/auth.context";
import { InputComponent } from "../../Input/Input";
import "./FormLogin.style.css";
import { MedicData } from "../../../Services/Medic/Medic.service";

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const submitForm = async (data) => {
    const { email, password } = data;

    const user = await MedicData.ShowByEmail(email);

    if (!user) {
      alert("Usuário não cadastrado");
      reset();
      return;
    }

    localStorage.setItem("Logged", data.email);

    password === user.password
      ? redirectToHome(user)
      : alert("Ops! Usuário e/ou Senha Invalidos.");
  };

  const redirectToHome = (user) => {
    setAuth({ user, isLogged: true });
    navigate("/");
  };

  const redirectRegister = () => {
    navigate("/register");
  };
  const notFinished = () => {
    alert("Função em desenvolvimento");
  };

  return (
    <form className="formLoginContainer" onSubmit={handleSubmit(submitForm)}>
      <div className="formContent">
        <header className="formHeader">
          <h1 className="formTitle">Login</h1>
          <span className="formSubTitle">
            Para acessar o sistema digite seu email e sua senha.
          </span>
        </header>

        <div className="formInputGroup">
          <InputComponent
            id="email"
            type="email"
            placeholder="Digite seu email"
            label="E-mail"
            register={{
              ...register("email", {
                required: true,
                validate: {
                  matchPath: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
                },
              }),
            }}
            error={errors.email}
          />
          <InputComponent
            id="password"
            type="password"
            placeholder="Digite sua senha"
            label="Senha"
            register={{
              ...register("password", { required: true, minLength: 8 }),
            }}
            error={errors.password}
          />
        </div>

        <div className="formAction">
          <div className="formLinks">
            <a onClick={notFinished}>Esqueci minha senha</a>
            <button
              onClick={redirectRegister}
              className="formCreateButton"
              type="button"
            >
              Criar conta
            </button>
          </div>
          <button
            className="formEnterButton"
            type="submit"
            disabled={errors.email || errors.password}
          >
            Entrar
          </button>
        </div>
      </div>
    </form>
  );
};
