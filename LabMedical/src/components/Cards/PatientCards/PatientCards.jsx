import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PatientCards.style.css";
import { InputComponent } from "../../Input/Input";

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
      <form className="search" onSubmit={buscarPaciente}>
        <legend>Informações Rápidas de Pacientes</legend>
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
      <div className="patientsContainer">
        <div className="patientsGrid">
          {pacienteFiltrado &&
            pacienteFiltrado.map((paciente) => {
              return (
                <Card key={paciente?.id} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    image={paciente?.url}
                    alt="erro"
                    component="img"
                    height="140"
                  />
                  <CardContent className="homeContent">
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Nome:</strong> {paciente?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Idade:</strong>
                      {paciente?.age}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Telefone:</strong>
                      <br />
                      {paciente?.telephone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{paciente?.insurance}</strong>
                    </Typography>
                    <CardActions>
                      <Link to={`/register-patient/${paciente?.id}`}>
                        Ver Mais
                      </Link>
                    </CardActions>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CardPatients;
