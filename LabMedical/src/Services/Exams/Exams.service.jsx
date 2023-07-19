const API_URL = `http://localhost:3000/exames`;

const Get = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
export const ExamsData = {
  Get,
};
