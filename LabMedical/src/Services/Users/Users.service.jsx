const API_URL = `http://localhost:3000/users`;

//Method GET
const Get = async () => {
  const response = await fetch(API_URL);
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
    .then((res) => {
      alert("Cadastrado com sucesso");
    })
    .catch((err) => {
      alert(`Erro ao cadastrar ${err.message}`);
    });
};

//Method GET
const ShowByEmail = async (email) => {
  const response = await fetch(`${API_URL}?email=${email}&`);
  const data = await response.json();
  return data[0];
};

//Method DELETE
const Delete = (id) => {};

//Method PUT/PATCH
const Update = (id, data) => {};

export const UserService = {
  Get,
  Create,
  ShowByEmail,
  Delete,
  Update,
};
