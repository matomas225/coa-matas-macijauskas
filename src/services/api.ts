import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const users = `${API_URL}/users`;

export const apiPaths = {
  getUsers: `${users}/getUsers`,
};
