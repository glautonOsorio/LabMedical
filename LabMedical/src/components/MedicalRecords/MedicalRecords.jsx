import { useEffect, useState } from "react";
import { InputComponent } from "../Input/Input";
import "./MedicalRecords.style.css";

const MedicalRecords = () => {
  const [pacientes, setPacientes] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/pacientes`).then(async (response) => {
      const data = await response.json();

      setPacientes(data);
    });
  }, []);

  return (
    <section className="recordsContainer">
      <h1>Utilize a Barra de Pesquisa para buscar</h1>
      <div className="recordsSearch">
        <InputComponent />
        <button> Buscar</button>
      </div>
      <div className="recordsContent">
        <div className="div1">
          <h4>Registro</h4>
          <h5 c>Nome do Paciente</h5>
          <h6>Convênio</h6>
        </div>

        {pacientes &&
          pacientes.map((paciente) => {
            return (
              <div className="Row">
                <div key={paciente.id} className="div2">
                  <span>{paciente.id}</span>

                  <span> {paciente.name}</span>

                  <span> {paciente.insurance}</span>
                </div>
                <button>7</button>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default MedicalRecords;
