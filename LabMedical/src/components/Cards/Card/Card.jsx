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
  console.log(exames, pacientes, consultas);

  return (
    <main className="cardContainer">
      <div>{exames}</div>
      <div>{pacientes}</div>
      <div>{consultas} </div>
    </main>
  );
};

export default Cards;
