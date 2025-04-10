const API_URL = import.meta.env.VITE_API_URL;
const users = `${API_URL}/users`;

export const apiPaths = {
  getUsers: `${users}/getUsers`,
  postUser: `${users}/postUser`,
  loginUser: `${users}/loginUser`,
};
