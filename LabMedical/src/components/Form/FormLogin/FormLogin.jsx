import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/auth.context";
import * as Styled from "./FormLogin.style";
import { InputComponent } from "../../Input/Input";

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
    <Styled.Form onSubmit={handleSubmit(submitForm)}>
      <Styled.Header>
        <Styled.Title>Login</Styled.Title>
        <Styled.SubTitle>
          Para acessar o sistema digite seu email e sua senha.
        </Styled.SubTitle>
      </Styled.Header>

      <Styled.InputGroup>
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
      </Styled.InputGroup>

      <Styled.Button
        $active={!errors.email && !errors.password}
        type="submit"
        disabled={errors.email || errors.password}
      >
        Entrar
      </Styled.Button>

      <Styled.Action>
        <Styled.EsqueciSenha>Esqueci minha senha</Styled.EsqueciSenha>
        <Styled.Button $outlined={true} type="button" onClick={createUser}>
          Criar conta
        </Styled.Button>
      </Styled.Action>
    </Styled.Form>
  );
};
