import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";

import { useParams } from "react-router-dom";
import { Exams } from "../../../Services/Exams/Exams.service";
import { InputComponent } from "../../Input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Patient } from "../../../Services/Patients/Patient.service";

const FormExams = () => {
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
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const paramsUser = async () => {
        await Exams.GetID(params.id).then((user) => {
          setValue("examData", user.examData);
          setValue("patient_id", user.patient_id);
          setValue("patient_name", user.patient_name);
          setValue("name", user.name);
          setValue("time", user.time);
          setValue("type", user.type);
          setValue("lab", user.lab);
          setValue("url", user.url);
          setValue("result", user.result);
        });
      };
      paramsUser();
      setDisabled(false);
    }
  }, []);

  const handleSearch = async () => {
    await Patient.GetID(watch("patientID")).then((search) => {
      setValue("patient_id", search.id);
      setValue("patient_name", search.name);
    });
  };

  const submitEdit = async (data) => {
    setEditLoad(true);

    const body = {
      ...data,
    };

    await setValue("examData", new Date(body.examData));
    await Exams.Update(params.id, body);
    await Appointment.Update(params.id, body);
    setTimeout(async () => {
      setEditLoad(false);
    }, 2000);
  };
  const submitDelete = async () => {
    setDeleteLoad(true);

    await Exams.Delete(params.id);

    setTimeout(async () => {
      setDeleteLoad(false);
    }, 2000);
  };
  const submitForm = async (data) => {
    setSaveLoad(true);

    const body = {
      ...data,
    };

    await setValue("examData", new Date(body.examData));
    await Exams.Create(body);
    setTimeout(() => {
      setSaveLoad(false);
    }, 2000);
  };
  return (
    <main className="formRegister">
      <form
        className="formRegisterPContainer"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="formContent">
          <legend className="formTitle">Exame de paciente</legend>
          <div className="formRowSearch">
            <InputComponent
              id="patientID"
              type="text"
              label="Encontre o paciente pelo Identificador"
              register={{
                ...register("patientID"),
              }}
            />
            <Button
              className="cepButton"
              variant="outlined"
              type="button"
              onClick={handleSearch}
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
        <div className="formContent">
          <div className="formRow">
            <InputComponent
              id="name"
              type="text"
              placeholder="Nome do Exame"
              label="Nome do Exame"
              register={{
                ...register("name", {
                  required: true,
                  minlenght: 5,
                  maxLength: 50,
                }),
              }}
              error={errors.name}
            />
            <InputComponent
              id="patient_id"
              type="text"
              placeholder="Id"
              label="Id do Paciente"
              register={{
                ...register("patient_id", {
                  required: true,
                }),
              }}
              error={errors.patient_id}
            />
            <InputComponent
              id="patient_name"
              type="text"
              placeholder="Nome do Paciente"
              label="Nome do Paciente"
              register={{
                ...register("patient_name", {
                  required: true,
                }),
              }}
              error={errors.patient_name}
            />
          </div>
          <div className="formRow">
            <InputComponent
              id="examData"
              type="date"
              label="Data do Exame"
              register={{
                ...register("examData", { required: true }),
              }}
              error={errors.examData}
            />
            <InputComponent
              id="time"
              type="time"
              label="Horário do Exame"
              register={{
                ...register("time", { required: true }),
              }}
              error={errors.time}
            />

            <InputComponent
              id="type"
              type="text"
              placeholder="Tipo do Exame"
              label="Tipo do Exame"
              register={{
                ...register("type", {
                  required: true,
                  minlenght: 5,
                  maxLength: 30,
                }),
              }}
              error={errors.type}
            />
          </div>
          <div className="formRow">
            <InputComponent
              id="lab"
              type="text"
              placeholder="Laboratório"
              label="Laboratório"
              register={{
                ...register("lab", {
                  required: true,
                  minlenght: 5,
                  maxLength: 30,
                }),
              }}
              error={errors.lab}
            />
            <InputComponent
              id="url"
              type="text"
              placeholder="URL do Documento"
              label="URL do Documento"
              register={{
                ...register("url"),
              }}
              error={errors.url}
            />
          </div>

          <InputComponent
            id="result"
            type="textarea"
            label="Resultados"
            register={{
              ...register("result", {
                required: true,
                minlenght: 15,
                maxLength: 1000,
              }),
            }}
            error={errors.result}
          />

          <div>
            <Button
              variant="outlined"
              endIcon={<EditIcon />}
              disabled={disabled}
              onClick={handleSubmit(submitEdit)}
            >
              {editLoad && <CircularProgress />} Editar
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
              disabled={
                errors.patientID ||
                errors.patient_name ||
                errors.name ||
                errors.date ||
                errors.time ||
                errors.type ||
                errors.lab ||
                errors.url ||
                errors.result
              }
              type="submit"
            >
              {saveLoad && <CircularProgress />}
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default FormExams;
