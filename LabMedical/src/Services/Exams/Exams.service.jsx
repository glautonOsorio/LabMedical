const API_URL = `http://localhost:3000/exames`;

const Get = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

const GetID = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
};
const GetPatientId = async (patientID) => {
  const response = await fetch(`${API_URL}?patient_id=${patientID}&`);
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
const Update = async (id, newData) => {
  await fetch(`${API_URL}/${id}`, {
    method: "Put",
    body: JSON.stringify({
      patient_id: newData.patient_id,
      patient_name: newData.patient_name,
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
      alert("Atualizado com sucesso");
    })
    .catch((err) => {
      alert(`Erro ao atualizar ${err.message}`);
    });
};
const Delete = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "Delete",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      alert("Deletado com sucesso");
    })
    .catch((err) => {
      alert(`Erro ao deletar ${err.message}`);
    });
};
export const Exams = {
  Get,
  GetID,
  GetPatientId,
  Create,
  Update,
  Delete,
};
