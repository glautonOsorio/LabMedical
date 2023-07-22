const API_URL = `http://localhost:3000/consultas`;

const Create = async (newData) => {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      reason: newData.reason,
      date: newData.date,
      time: newData.time,
      description: newData.description,
      recipe: newData.recipe,
      dosage: newData.dosage,
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

export const AppoitmentData = {
  Create,
};
