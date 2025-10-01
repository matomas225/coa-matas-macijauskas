const API_URL = import.meta.env.VITE_API_URL
const users = `${API_URL}/users`
const songs = `${API_URL}/songs`
const albums = `${API_URL}/albums`

export const apiPaths = {
  getUsers: `${users}/getUsers`,
  postUser: `${users}/postUser`,
  loginUser: `${users}/loginUser`,
  isLogedIn: `${users}/isLogedIn`,
  getSongs: `${songs}`,
  uploadSong: `${songs}/upload`,
  getUserSongs: `${songs}/user-songs`,
  deleteSong: `${songs}/user-songs`,
  getSong: `${songs}/song`,
  updateSong: `${songs}/user-songs`,
  getAlbums: `${albums}/`,
  getAllAlbums: `${albums}/all`,
  createAlbum: `${albums}/create`,
  addSongToAlbum: `${albums}/add-song`,
  removeSongFromAlbum: `${albums}/remove-song`,
  getAlbumCover: `${albums}/cover`,
}
