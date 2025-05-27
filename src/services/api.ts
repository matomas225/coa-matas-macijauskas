const API_URL = import.meta.env.VITE_API_URL;
const users = `${API_URL}/users`;
const songs = `${API_URL}/songs`;

export const apiPaths = {
  getUsers: `${users}/getUsers`,
  postUser: `${users}/postUser`,
  loginUser: `${users}/loginUser`,
  isLogedIn: `${users}/isLogedIn`,
  getSongs: `${songs}`,
  uploadSong: `${songs}/upload`,
};
