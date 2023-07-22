import { ExamsData } from "../../../Services/Exams/Exams.service";
import { InputComponent } from "../../Input/Input";
import { useForm } from "react-hook-form";

const FormExams = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const submitForm = async (data) => {
    const { name, date, time, type, lab, url, result } = data;
    await ExamsData.Create(data);
  };
  return (
    <main>
      <div>
        <h3>Encontre o paciente</h3>
        <InputComponent />
        <button>Busca</button>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
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
            id="date"
            type="date"
            label="Data do Exame"
            register={{
              ...register("date", { required: true, valueAsDate: true }),
            }}
            error={errors.date}
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
          <button disabled> Editar</button>
          <button disabled> Deletar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </main>
  );
};

export default FormExams;
