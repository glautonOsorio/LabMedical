const API_URL = ` http://localhost:3000/pacientes`;
const API_VIACEP = `http://viacep.com.br/ws/CEP/json/`;

const Create = async (newData) => {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name: newData.name,
      gender: newData.gender,
      age: newData.age,
      birthdate: newData.birthdate,
      cpf: newData.cpf,
      rg: newData.rg,
      maritalStatus: newData.maritalStatus,
      telephone: newData.telephone,
      email: newData.email,
      nationality: newData.nationality,
      emergency: newData.emergency,
      allergies: newData.allergies,
      specificCare: newData.specificCare,
      insurance: newData.insurance,
      insuranceNumber: newData.insuranceNumber,
      expireDate: newData.expireDate,
      url: newData.url,
      cep: newData.cep,
      city: newData.city,
      state: newData.state,
      place: newData.place,
      number: newData.number,
      complement: newData.complement,
      street: newData.street,
      referencePoint: newData.referencePoint,
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
      name: newData.name,
      gender: newData.gender,
      age: newData.age,
      birthdate: newData.birthdate,
      cpf: newData.cpf,
      rg: newData.rg,
      maritalStatus: newData.maritalStatus,
      telephone: newData.telephone,
      email: newData.email,
      nationality: newData.nationality,
      emergency: newData.emergency,
      allergies: newData.allergies,
      specificCare: newData.specificCare,
      insurance: newData.insurance,
      insuranceNumber: newData.insuranceNumber,
      expireDate: newData.expireDate,
      url: newData.url,
      cep: newData.cep,
      city: newData.city,
      state: newData.state,
      place: newData.place,
      number: newData.number,
      complement: newData.complement,
      street: newData.street,
      referencePoint: newData.referencePoint,
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
const GetID = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
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
const GetCEP = async (cep) => {
  const response = await fetch(API_VIACEP.replace("CEP", cep));
  const data = await response.json();
  return data;
};

export const Patient = {
  Create,
  GetID,
  GetCEP,
  Update,
  Delete,
};
