import { useEffect, useState } from "react";
import { InputComponent } from "../../Input/Input";

const CardPatients = () => {
  const [pacientes, setPacientes] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/pacientes`).then(async (response) => {
      const data = await response.json();

      setPacientes(data);
    });
  }, []);

  return (
    <div>
      <div>
        <InputComponent />
        <button>Busca</button>
      </div>
      {pacientes &&
        pacientes.map((paciente) => {
          return (
            <div key={paciente?.id}>
              <img src={paciente?.URL} alt="erro" />
              <h1> {paciente?.name}</h1>
              <p> {paciente?.age}</p>
              <span> {paciente?.telephone}</span>
              <h2> {paciente?.insurance} </h2>
              <button> ver mais</button>
            </div>
          );
        })}
    </div>
  );
};

export default CardPatients;
