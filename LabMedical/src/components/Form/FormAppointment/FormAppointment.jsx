import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";

import { Appointment } from "../../../Services/Appoitments/Appoitments.service";
import { InputComponent } from "../../Input/Input";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../../../Services/Patients/Patient.service";

const FormAppointment = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
        await Appointment.GetID(params.id).then((user) => {
          setValue("reason", user.reason);
          setValue("patient_id", user.patient_id);
          setValue("patient_name", user.patient_name);
          setValue("date", user.date);
          setValue("time", user.time);
          setValue("description", user.description);
          setValue("recipe", user.recipe);
          setValue("dosage", user.dosage);
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

    await setValue("date", new Date(body.date));
    await Appointment.Update(params.id, body);
    setTimeout(async () => {
      setEditLoad(false);
    }, 2000);
  };
  const submitDelete = async () => {
    setDeleteLoad(true);
    await Appointment.Delete(params.id);
    setTimeout(async () => {
      setDeleteLoad(false);
    }, 2000);
  };
  const submitForm = async (data) => {
    setSaveLoad(true);

    const body = {
      ...data,
    };

    await setValue("date", new Date(body.date));
    await Appointment.Create(body);
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
          <legend className="formTitle">Consulta de paciente</legend>
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
              id="reason"
              type="text"
              placeholder="Motivo"
              label="Motivo da Consulta"
              register={{
                ...register("reason", {
                  required: true,
                  minlenght: 6,
                  maxLength: 60,
                }),
              }}
              error={errors.reason}
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
            <InputComponent
              id="date"
              type="date"
              label="Data da Consulta"
              register={{
                ...register("date", { required: true, valueAsDate: true }),
              }}
              error={errors.date}
            />
            <InputComponent
              id="time"
              type="time"
              label="Horário da Consulta"
              register={{
                ...register("time", { required: true }),
              }}
              error={errors.time}
            />
          </div>

          <div className="formRow">
            <InputComponent
              id="description"
              type="textarea"
              placeholder="Descrição do Problema"
              register={{
                ...register("description", {
                  required: true,
                  minlenght: 15,
                  maxLength: 1000,
                }),
              }}
              error={errors.description}
            />
            <InputComponent
              id="recipe"
              type="textarea"
              placeholder="Medicação Receitada"
              register={{
                ...register("recipe"),
              }}
              error={errors.recipe}
            />
          </div>
          <InputComponent
            id="dosage"
            type="textarea"
            placeholder="Dosagem e Precauções"
            register={{
              ...register("dosage", {
                required: true,
                minlenght: 15,
                maxLength: 250,
              }),
            }}
            error={errors.dosage}
          />

          <div>
            <Button
              variant="outlined"
              endIcon={<EditIcon />}
              disabled={disabled}
              onClick={handleSubmit(submitEdit)}
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
                errors.reason ||
                errors.time ||
                errors.date ||
                errors.description ||
                errors.dosage ||
                errors.patientID ||
                errors.patient_name
              }
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

export default FormAppointment;
