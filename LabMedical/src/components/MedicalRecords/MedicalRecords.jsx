import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState } from "react";
import { InputComponent } from "../Input/Input";
import "./MedicalRecords.style.css";
import { Link } from "react-router-dom";

const MedicalRecords = () => {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteFiltrado, setPacienteFiltrado] = useState([]);
  const [filtro, setFiltro] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/pacientes`).then(async (response) => {
      const data = await response.json();

      setPacientes(data);
      setPacienteFiltrado(data);
    });
  }, []);

  const filtrarPacientes = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setFiltro(value);
  };

  const buscarPaciente = async (e) => {
    e.preventDefault();
    const filter = await pacientes.filter((paciente) =>
      paciente.name.includes(filtro)
    );
    setPacienteFiltrado(filter);
  };

  return (
    <section className="recordsContainer">
      <form className="search" onSubmit={buscarPaciente}>
        <legend>Utilize a Barra de Pesquisa para buscar</legend>
        <div className="searchPatient">
          <InputComponent
            type="search"
            placeholder="Digite um nome"
            onInput={filtrarPacientes}
          />
          <Button variant="outlined" type="submit">
            <SearchIcon />
          </Button>
        </div>
      </form>
      <div className="recordsContent">
        <div className="div1">
          <h4 className="textPosition1">Registro</h4>
          <h5 className="textPosition2">Nome do Paciente</h5>
          <h6 className="textPosition3">Convênio</h6>
        </div>

        {pacienteFiltrado &&
          pacienteFiltrado.map((paciente) => {
            return (
              <div key={paciente.id} className="Row">
                <div className="div2">
                  <div>
                    <span className="textPosition1">{paciente?.id}</span>
                  </div>
                  <div>
                    <span className="textPosition2"> {paciente?.name}</span>
                  </div>
                  <div>
                    <span className="textPosition3">{paciente?.insurance}</span>
                  </div>
                </div>
                <Link
                  className="linkArrow"
                  to={`/patient-records/${paciente.id}`}
                >
                  <ArrowForwardIosIcon />
                </Link>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default MedicalRecords;
