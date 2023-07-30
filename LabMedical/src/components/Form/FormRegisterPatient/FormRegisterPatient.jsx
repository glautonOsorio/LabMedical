import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import InputMask from "react-input-mask";

import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputComponent } from "../../Input/Input";
import { Patient } from "../../../Services/Patients/Patient.service";
import { useEffect, useState } from "react";
import "./FormRegisterPatient.style.css";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(true);
  const [saveLoad, setSaveLoad] = useState(false);
  const [editLoad, setEditLoad] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [maskedInput, setMaskedInput] = useState(true);
  const [unMaskedInput, setUnMaskedInput] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const paramsUser = async () => {
        await Patient.GetID(params.id).then((user) => {
          setValue("name", user.name);
          setValue("gender", user.gender);
          setValue("age", user.age);
          setValue("birthdate", user.birthdate);
          setValue("cpf", user.cpf);
          setValue("rg", user.rg);
          setValue("maritalStatus", user.maritalStatus);
          setValue("telephone", user.telephone);
          setValue("email", user.email);
          setValue("nationality", user.nationality);
          setValue("emergency", user.emergency);
          setValue("allergies", user.allergies);
          setValue("specificCare", user.specificCare);
          setValue("insurance", user.insurance);
          setValue("insuranceNumber", user.insuranceNumber);
          setValue("expireDate", user.expireDate);
          setValue("url", user.url);
          setValue("cep", user.cep);
          setValue("city", user.city);
          setValue("state", user.state);
          setValue("place", user.place);
          setValue("number", user.number);
          setValue("complement", user.complement);
          setValue("street", user.street);
          setValue("referencePoint", user.referencePoint);
        });
      };
      paramsUser();
      setMaskedInput(false);
      setUnMaskedInput(true);
      setDisabled(false);
    }
  }, []);

  const handleCep = async () => {
    await Patient.GetCEP(watch("cep")).then((response) => {
      setValue("city", response.localidade);
      setValue("state", response.uf);
      setValue("place", response.logradouro);
      setValue("complement", response.complemento);
      setValue("street", response.bairro);
    });
  };
  const unMaskedPhone = () => {
    return (
      <>
        <InputComponent
          id="telephone"
          type="text"
          label="Telefone"
          register={{
            ...register("telephone", { required: true }),
          }}
          error={errors.telephone}
        />
        <InputComponent
          id="emergency"
          type="text"
          label="Contato de Emergência"
          register={{
            ...register("emergency", { required: true }),
          }}
          error={errors.emergency}
        />
      </>
    );
  };
  const unMaskedCpf = () => {
    return (
      <>
        <InputComponent
          id="cpf"
          type="text"
          label="CPF"
          register={{
            ...register("cpf", {
              required: true,
              maxLength: 14,
            }),
          }}
          error={errors.cpf}
        />
      </>
    );
  };
  const submitForm = async (data) => {
    setSaveLoad(true);
    const body = {
      ...data,
    };

    await setValue("birthdate", new Date(body.birthdate));
    if (body.insurance === "") {
      await setValue("insurance", "Sem Plano");
    }
    await Patient.Create(body);

    setTimeout(() => {
      setSaveLoad(false);
    }, 2000);
  };
  const submitEdit = async (data) => {
    setEditLoad(true);
    const body = {
      ...data,
    };

    await setValue("birthdate", new Date(body.birthdate));

    await Patient.Update(params.id, body);

    setTimeout(async () => {
      setEditLoad(false);
    }, 2000);
  };
  const submitDelete = async () => {
    setDeleteLoad(true);
    await Patient.Delete(params.id);

    setTimeout(async () => {
      setDeleteLoad(false);
    }, 2000);
  };

  return (
    <div className="formRegister">
      <form
        className="formRegisterPContainer"
        onSubmit={handleSubmit(submitForm)}
      >
        <legend className="formTitle">Preencha os campos para cadastrar</legend>
        <div className="formContent">
          <legend className="formTitle">Indentificação</legend>
          <div className="formRow">
            <InputComponent
              id="name"
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
              error={errors.name}
            />
            <InputComponent
              id="age"
              type="number"
              placeholder="Digite sua Idade"
              label="Idade"
              register={{
                ...register("age", {
                  required: true,
                }),
              }}
              error={errors.age}
            />
            <InputComponent
              id="url"
              type="text"
              placeholder="Link sua Imagem"
              label="Imagem"
              register={{
                ...register("url", {
                  required: true,
                }),
              }}
              error={errors.url}
            />

            <div className="select">
              <label className="genderLabel" htmlFor="gender">
                Gênero
              </label>
              <select id="gender" {...register("gender", { required: true })}>
                <option value="Homem">Homem</option>
                <option value="Mulher">Mulher</option>
                <option value="Outro">outro</option>
              </select>
            </div>
          </div>
          <div className="formRow">
            <InputComponent
              id="birthdate"
              type="date"
              label="Data de Nascimento"
              register={{
                ...register("birthdate", { required: true }),
              }}
              error={errors.birthdate}
            />
            {maskedInput && (
              <>
                <InputComponent
                  id="cpf"
                  type="text"
                  as={InputMask}
                  mask="999.999.999-99"
                  label="CPF"
                  register={{
                    ...register("cpf", {
                      required: true,
                      maxLength: 14,
                    }),
                  }}
                  error={errors.cpf}
                />
              </>
            )}
            {unMaskedInput && unMaskedCpf()}

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
            <div className="select">
              <label className="labelMstatus" htmlFor="maritalStatus">
                Estado Civil
              </label>
              <select
                id="maritalStatus"
                {...register("maritalStatus", { required: true })}
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
            {maskedInput && (
              <>
                <InputComponent
                  id="telephone"
                  type="text"
                  as={InputMask}
                  mask="(99) 9 9999-99999"
                  label="Telefone"
                  register={{
                    ...register("telephone", { required: true }),
                  }}
                  error={errors.telephone}
                />
                <InputComponent
                  id="emergency"
                  type="text"
                  as={InputMask}
                  mask="(99) 9 9999-99999"
                  label="Contato de Emergência"
                  register={{
                    ...register("emergency", { required: true }),
                  }}
                  error={errors.emergency}
                />
              </>
            )}
            {unMaskedInput && unMaskedPhone()}
            <InputComponent
              id="email"
              type="email"
              placeholder="Digite seu email"
              label="email"
              register={{
                ...register("email", {
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
          </div>
          <div className="formRow ">
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
        <div className="formContent">
          <legend className="formTitle">Convênio</legend>

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
        <div className="formContent">
          <legend className="formTitle">Dados de Endereço</legend>
          <div className="formRowSearch">
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
            <Button
              className="cepButton"
              variant="outlined"
              type="button"
              onClick={handleCep}
            >
              <SearchIcon />
            </Button>
          </div>
          <div className="formRow">
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
              readOnly
              register={{
                ...register("state"),
              }}
              error={errors.state}
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
          <div>
            <Button
              variant="outlined"
              endIcon={<EditIcon />}
              type="button"
              onClick={handleSubmit(submitEdit)}
              disabled={disabled}
            >
              {editLoad && <CircularProgress />}
              Editar
            </Button>
            <Button
              variant="outlined"
              endIcon={<DeleteIcon />}
              disabled={disabled}
              onClick={handleSubmit(submitDelete)}
            >
              {deleteLoad && <CircularProgress />}
              Deletar
            </Button>
            <Button
              variant="outlined"
              endIcon={<SaveIcon />}
              type="submit"
              disabled={
                errors.name ||
                errors.age ||
                errors.url ||
                errors.birthdate ||
                errors.cpf ||
                errors.rg ||
                errors.telephone ||
                errors.emergency ||
                errors.email ||
                errors.nationality ||
                errors.allergies ||
                errors.specificCa ||
                errors.insurance ||
                errors.insuranceN ||
                errors.expireDate ||
                errors.cep ||
                errors.city ||
                errors.state ||
                errors.place ||
                errors.number ||
                errors.complement ||
                errors.street ||
                errors.referenceP
              }
            >
              {saveLoad && <CircularProgress />}
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
