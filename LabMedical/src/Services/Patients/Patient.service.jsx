const API_URL = ` http://localhost:3000/pacientes`;

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

export const Patient = {
  Create,
};

{
  /*
  errors.fullName;

  errors.birthdate;
  errors.cpf;

  errors.rg;

  errors.telephone;
  errors.emergency;
  errors.email;

  errors.nationalit;
  errors.allergies;
  errors.specificCa;
  errors.insurance;
  errors.insuranceN;
  errors.expireDate;
  errors.cep;

  errors.city;

  errors.state;

  errors.place;

  errors.number;

  errors.complement;
  errors.street;

  errors.referenceP;
*/
}
