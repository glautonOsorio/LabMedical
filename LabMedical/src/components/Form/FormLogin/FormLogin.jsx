import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/auth.context";
import { InputComponent } from "../../Input/Input";
import "./FormLogin.style.css";

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const createUser = () => {
    UserService.Create({
      email: "batata@frita.com",
      password: "doMcDonalds",
    });
  };

  const submitForm = (data) => {
    const { email, password } = data;

    const user = UserService.ShowByEmail(email);

    if (!user) {
      alert("Usuário não cadastrado");
      reset();
      return;
    }

    password === user.password
      ? redirectToHome(user)
      : alert("Ops! Usuário e/ou Senha Invalidos.");
  };

  const redirectToHome = (user) => {
    setAuth({ user, isLogged: true });
    navigate("/");
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit(submitForm)}>
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
            <span>Esqueci minha senha</span>
            <button
              className="formCreateButton"
              $outlined={true}
              type="button"
              onClick={createUser}
            >
              Criar conta
            </button>
          </div>
          <button
            className="formEnterButton"
            $active={!errors.email && !errors.password}
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
