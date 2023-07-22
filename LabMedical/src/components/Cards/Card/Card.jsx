import "./Card.style.css";
import { useEffect, useState } from "react";

const Cards = () => {
  const [exames, setExame] = useState();
  const [pacientes, setPacientes] = useState();
  const [consultas, setConsultas] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/exames`).then(async (response) => {
      const data = await response.json();
      const number = await data.length;
      setExame(number);
    });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/consultas`).then(async (response) => {
      const data = await response.json();
      const number = await data.length;
      setConsultas(number);
    });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/pacientes`).then(async (response) => {
      const data = await response.json();
      const number = await data.length;
      setPacientes(number);
    });
  }, []);
  return (
    <main className="cardContainer">
      <h3>Estatisticas do Sisterma</h3>
      <div className=" cardRow">
        <div className="cardContent">
          <div className="cardCollum">
            <span> Imagem</span>
            <span>{pacientes}</span>
          </div>
          <h4>Pacientes</h4>
        </div>
        <div className="cardContent">
          <div className="cardCollum">
            <span> Imagem</span>
            {consultas}
          </div>
          <h4>Consultas</h4>
        </div>

        <div className="cardContent">
          <div className="cardCollum">
            <span> Imagem</span>
            {exames}
          </div>
          <h4>Exames</h4>
        </div>
      </div>
    </main>
  );
};

export default Cards;
