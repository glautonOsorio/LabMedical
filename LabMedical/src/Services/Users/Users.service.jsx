const API_URL = "http://localhost:3000/users";
import { LocalStorageService } from "./LocalStorage.service";

const Get = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
};

const Create = (data) => {
  const users = Get();

  data = {
    id: users.length + 1,
    ...data,
  };

  LocalStorageService.set("users", [...users, data]);
};

const Show = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();

  return data;
};

const ShowByEmail = async (email) => {
  const filter = await `?email=${email}`;
  const response = await fetch(`${API_URL}${filter}`);
  const data = await response.json();

  return data;
};

const Delete = (id) => {
  LocalStorageService.set(
    "users",
    Get().filter((user) => user.id !== id)
  );
};

const Update = (id, data) => {
  const users = Get();

  users[users.find((user) => user.id === id).indexOf] = data;

  LocalStorageService.set("users", users);
};

export const UserService = {
  Get,
  Create,
  Show,
  ShowByEmail,
  Delete,
  Update,
};
