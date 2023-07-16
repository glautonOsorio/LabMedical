const API_URL = `http://localhost:3000/users`;
const API_VIACEP = `http://viacep.com.br/ws/CEP/json/`;

//Method GET
const Get = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

const GetCEP = async (cep) => {
  const response = await fetch(
    API_VIACEP.replace("CEP", cep.replace("-", "").trim())
  );
  const data = await response.json();
  return data;
};

const Create = async (newData) => {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      email: newData.email,
      password: newData.password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(() => {
      toast("cadastrado com sucesso");
    })
    .catch(() => {
      alert("Erro ao cadastrar");
    });
};

const Show = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
};

//Method GET
const ShowByEmail = async (email) => {
  let filter = `?`;

  if (email) {
    filter += `email=${email}&`;
  }

  const response = await fetch(`${API_URL}${filter}`);
  const data = await response.json();
  return data[0];
};

//Method DELETE
const Delete = (id) => {};

//Method PUT/PATCH
const Update = (id, data) => {};

export const UserService = {
  Get,
  GetCEP,
  Create,
  Show,
  ShowByEmail,
  Delete,
  Update,
};
