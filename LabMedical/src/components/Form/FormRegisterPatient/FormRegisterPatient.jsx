import { useForm } from "react-hook-form";
import { InputComponent } from "../../Input/Input";
import "./FormRegisterPatient.style.css";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="formRegisterP">
      <h2>Preencha os campos para cadastrar</h2>
      <form>
        <div>
          <h3>Indentificação</h3>
          <div className="formRow">
            <InputComponent
              id="fullName"
              type="text"
              placeholder="Digite seu nome"
              label="Nome Completo"
              register={{
                ...register("name", {
                  required: true,
                  minLength: 5,
                  maxLength: 50,
                }),
              }}
              error={errors.fullName}
            />

            <div>
              <label htmlFor="gender">Gênero</label>
              <select id="gender" {...register("gender", { required: true })}>
                <option value="Homem">Homem</option>
                <option value="Mulher">Mulher</option>
                <option value="Outro">outro</option>
              </select>
            </div>
            <InputComponent
              id="birthdate"
              type="date"
              label="Data de Nascimento"
              register={{
                ...register("birthdate", { required: true, valueAsDate: true }),
              }}
              error={errors.birthdate}
            />
          </div>
          <div className="formRow">
            <InputComponent
              id="cpf"
              type="text"
              placeholder="999.999.999-99"
              label="CPF"
              register={{
                ...register("cpf", {
                  required: true,
                  maxLength: 11,
                  pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(
                    "676.928.678-52"
                  ),
                }),
              }}
              error={errors.cpf}
            />
            <InputComponent
              id="rg"
              type="text"
              placeholder="Digite seu RG"
              label="RG"
              register={{
                ...register("rg", { required: true, maxLength: 20 }),
              }}
              error={errors.rg}
            />
            <div>
              <label htmlFor="maritalStatus">Estado Civil</label>
              <select
                id="maritalStatus"
                {...register("marital-status", { required: true })}
              >
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
                <option value="Separado">Separado</option>
                <option value="Divorciado">Divorciado </option>
                <option value="Viúvo">Viúvo</option>
              </select>
            </div>
          </div>
          <div className="formRow">
            <InputComponent
              id="telephone"
              type="text"
              placeholder="(99) 9 9999-99999"
              label="Telefone"
              register={{
                ...register("telephone", { required: true }),
              }}
              error={errors.telephone}
            />
            <InputComponent
              id="emergency"
              type="text"
              placeholder="(99) 9 9999-99999"
              label="Contato de Emergência"
              register={{
                ...register("emergency", { required: true }),
              }}
              error={errors.emergency}
            />
            <InputComponent
              id="email"
              type="email"
              placeholder="Digite seu email"
              label="E-mail"
              register={{
                ...register("e-mail", {
                  validate: {
                    matchPath: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
                  },
                }),
              }}
              error={errors.email}
            />
            <InputComponent
              id="nationality"
              type="text"
              placeholder="Digite sua Naturalidade"
              label="Naturalidade"
              register={{
                ...register("nationality", {
                  required: true,
                  minLength: 5,
                  maxLength: 50,
                }),
              }}
              error={errors.nationality}
            />
            <InputComponent
              id="allergies"
              type="textarea"
              placeholder="Lista de Alergias"
              register={{
                ...register("allergies", {
                  maxLength: 500,
                }),
              }}
              error={errors.allergies}
            />
            <InputComponent
              id="specificCare"
              type="textarea"
              placeholder="Lista de Cuidados Específicos"
              register={{
                ...register("specificCare", {
                  maxLength: 500,
                }),
              }}
              error={errors.specificCare}
            />
          </div>
        </div>
        <div>
          <h3>Convênio</h3>

          <div className="formRow">
            <InputComponent
              id="insurance"
              type="text"
              placeholder="Unimed"
              label="Convênio"
              register={{
                ...register("insurance"),
              }}
              error={errors.insurance}
            />
            <InputComponent
              id="insuranceNumber"
              type="text"
              placeholder="6666666"
              label="Número do Convênio"
              register={{
                ...register("insuranceNumber"),
              }}
              error={errors.insuranceNumber}
            />
            <InputComponent
              id="expireDate"
              type="date"
              label="Validade do Convênio "
              register={{
                ...register("expireDate"),
              }}
              error={errors.expireDate}
            />
          </div>
        </div>
        <div>
          <h3>Dados de Endereço</h3>
          <div className="formRow">
            <InputComponent
              id="cep"
              type="text"
              placeholder="CEP"
              label="CEP"
              register={{
                ...register("cep"),
              }}
              error={errors.cep}
            />
            <InputComponent
              id="city"
              type="text"
              placeholder="Endereço"
              label="Cidade"
              register={{
                ...register("city"),
              }}
              error={errors.city}
              readOnly
            />
            <InputComponent
              id="state"
              type="text"
              placeholder="Estado"
              label="Estado"
              register={{
                ...register("state"),
              }}
              error={errors.state}
              readOnly
            />
          </div>
          <div className="formRow">
            <InputComponent
              id="place"
              type="text"
              placeholder="Logradouro"
              label="Logradouro"
              register={{
                ...register("place"),
              }}
              error={errors.place}
              readOnly
            />

            <InputComponent
              id="number"
              type="text"
              placeholder="Número"
              label="Número"
              register={{
                ...register("number"),
              }}
              error={errors.number}
              readOnly
            />
          </div>
          <div className="formRow">
            <InputComponent
              id="complement"
              type="text"
              placeholder="Complemento"
              label="Complemento"
              register={{
                ...register("complement"),
              }}
              error={errors.complement}
              readOnly
            />
            <InputComponent
              id="street"
              type="text"
              placeholder="Bairro"
              label="Bairro"
              register={{
                ...register("street"),
              }}
              error={errors.street}
              readOnly
            />
            <InputComponent
              id="referencePoint"
              type="referencePoint"
              placeholder="Ponto de Referência"
              label="Ponto de Referência"
              register={{
                ...register("referencePoint"),
              }}
              error={errors.referencePoint}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
