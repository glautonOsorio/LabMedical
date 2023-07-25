import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CardPatients = () => {
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
    <div>
      <form onSubmit={buscarPaciente}>
        <legend>Informações Rápidas de Pacientes</legend>
        <input
          type="search"
          placeholder="Digite um nome"
          onInput={filtrarPacientes}
        />
        <button type="submit">Busca</button>
      </form>
      {pacienteFiltrado &&
        pacienteFiltrado.map((paciente) => {
          return (
            <div key={paciente?.id}>
              <img src={paciente?.url} alt="erro" />
              <h1> {paciente?.name}</h1>
              <p> {paciente?.age}</p>
              <span> {paciente?.telephone}</span>
              <h2> {paciente?.insurance} </h2>
              <Link to={`/register-patient/${paciente?.id}`}>Ver Mais</Link>
            </div>
          );
        })}
    </div>
  );
};

export default CardPatients;
