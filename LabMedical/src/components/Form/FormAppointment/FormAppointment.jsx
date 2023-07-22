import { AppoitmentData } from "../../../Services/Appoitments/Appoitments.service";
import { InputComponent } from "../../Input/Input";
import { useForm } from "react-hook-form";

const FormAppointment = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const submitForm = async (data) => {
    const { reason, date, time, description, recipe, dosage } = data;
    await AppoitmentData.Create(data);
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
          <button disabled> Editar</button>
          <button disabled> Deletar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </main>
  );
};

export default FormAppointment;
