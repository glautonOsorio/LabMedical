import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../../Input/Input";
import "./FormRegister.style.css";
import { useEffect, useState } from "react";
import { MedicData } from "../../../Services/Medic/Medic.service";

const FormRegister = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitForm = async (data) => {
    const { email, name, url, password } = data;

    await MedicData.Create(data);

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
            id="name"
            type="text"
            placeholder="Digite seu nome"
            label="Nome"
            register={{
              ...register("name", { required: true, minLength: 5 }),
            }}
            error={errors.name}
          />
          <InputComponent
            id="url"
            type="url"
            placeholder="Link de sua Imagem"
            label="Foto de Perfil"
            register={{
              ...register("url", { required: true }),
            }}
            error={errors.url}
          />
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
          <InputComponent
            id="passwordVerify"
            type="password"
            placeholder="Digite sua senha"
            label="Verifique a Senha"
            register={{
              ...register("passwordVerify", {
                required: true,
                minLength: 8,
                validate: (val) => {
                  if (watch("password") != val) {
                    return "As senhas estão diferentes";
                  }
                },
              }),
            }}
            error={errors.passwordVerify}
          />
        </div>

        <div className="formRegisterAction">
          <div className="formRegisterLinks">
            <a onClick={redirectToLogin}>Lembrou de sua conta?</a>
          </div>
          <button
            className="formRegisterEnterButton"
            type="submit"
            disabled={
              errors.name ||
              errors.url ||
              errors.email ||
              errors.password ||
              errors.passwordVerify
            }
          >
            Criar Conta
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormRegister;
