const API_URL = `http://localhost:3000/exames`;

const Get = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
const Create = async (newData) => {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name: newData.name,
      date: newData.date,
      time: newData.time,
      type: newData.type,
      lab: newData.lab,
      url: newData.url,
      result: newData.result,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      alert("Cadastrado com sucesso");
    })
    .catch((err) => {
      alert(`Erro ao cadastrar ${err.message}`);
    });
};
export const ExamsData = {
  Get,
  Create,
};
