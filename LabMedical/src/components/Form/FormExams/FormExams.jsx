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
    await Patient.Show(watch("patientID")).then((search) => {
      setValue("patient_id", search.id);
      setValue("patient_name", search.name);
    });
  };

  const submitEdit = async (data) => {
    const {
      patient_id,
      patient_name,
      name,
      examData,
      time,
      type,
      lab,
      url,
      result,
    } = data;
    await Exams.Update(params.id, data);
  };
  const submitDelete = async () => {
    await Exams.Delete(params.id);
  };
  const submitForm = async (data) => {
    const {
      patient_id,
      patient_name,
      name,
      examData,
      time,
      type,
      lab,
      url,
      result,
    } = data;
    await Exams.Create(data);
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
          <InputComponent
            id="examData"
            type="date"
            label="Data de Nascimento"
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
        </div>
        <div>
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
        </div>
        <div>
          <button disabled={disabled} onClick={handleSubmit(submitEdit)}>
            Editar
          </button>
          <button disabled={disabled} onClick={handleSubmit(submitDelete)}>
            Deletar
          </button>
          <button
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
            Salvar
          </button>
        </div>
      </form>
    </main>
  );
};

export default FormExams;
