import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../../Input/Input";
import { UserService } from "../../../services/Users/Users.service";
import "./FormRegister.style.css";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitForm = async () => {
    const { email, password } = data;
    await UserService.Create(data);

    navigate("/login");
  };
  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <form className="formRegisterContainer" onSubmit={handleSubmit(submitForm)}>
      <div className="formRegisterContent">
        <header className="formRegisterHeader">
          <h1 className="formRegisterTitle">Registre sua conta</h1>
          <span className="formRegisterSubTitle">
            Para registrar-se no sistema digite seu email e sua senha.
          </span>
        </header>

        <div className="formRegisterInputGroup">
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

        <div className="formRegisterAction">
          <div className="formRegisterLinks">
            <a onClick={redirectToLogin}>Lembrou de sua conta?</a>
          </div>
          <button
            className="formRegisterEnterButton"
            type="submit"
            disabled={errors.email || errors.password}
          >
            Criar Conta
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormRegister;
