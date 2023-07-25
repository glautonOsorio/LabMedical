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
    await Patient.Show(watch("patientID")).then((search) => {
      setValue("patient_id", search.id);
      setValue("patient_name", search.name);
    });
  };
  const submitEdit = async (data) => {
    const {
      patient_id,
      patient_name,
      reason,
      date,
      time,
      description,
      recipe,
      dosage,
    } = data;
    await Appointment.Update(params.id, data);
  };
  const submitDelete = async () => {
    await Appointment.Delete(params.id);
  };
  const submitForm = async (data) => {
    const {
      patient_id,
      patient_name,
      reason,
      date,
      time,
      description,
      recipe,
      dosage,
    } = data;
    await Appointment.Create(data);
  };
  return (
    <main>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <InputComponent
            id="patientID"
            type="text"
            label="Encontre o paciente pelo Identificador"
            register={{
              ...register("patientID"),
            }}
          />
          <button type="button" onClick={handleSearch}>
            Busca
          </button>
        </div>
        <legend>Consulta de paciente</legend>
        <div>
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
        <div>
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
        </div>
        <div>
          <button disabled={disabled} onClick={handleSubmit(submitEdit)}>
            Editar
          </button>
          <button disabled={disabled} onClick={handleSubmit(submitDelete)}>
            Deletar
          </button>
          <button
            type="submit"
            disabled={errors.patientID || errors.patient_name}
          >
            Salvar
          </button>
        </div>
      </form>
    </main>
  );
};

export default FormAppointment;
