/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../configs/axios.config";

const filmApi = {
  getAllFilms: async (page = 1, size?: number, name?: string) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const params: any = {
      page,
      sort: "releaseDate,desc",
    };

    if (size !== undefined) {
      params.size = size;
    }

    if (name && name.trim() !== "") {
      params.filter = `name~'${name}'`;
    }

    const response = await axios.get(`${backendUrl}/api/v1/films`, {
      params,
    });

    return response;
  },

  createFilm: async (film: ReqFilm) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/api/v1/films`, film);
    return response;
  },
};

export default filmApi;
