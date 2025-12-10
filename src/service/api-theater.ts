/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../configs/axios.config";

const theaterApi = {
  getAllTheaters: async (page: number, size?: number) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const params: any = {
      page,
    };

    if (size !== undefined) {
      params.size = size;
    }

    const response = await axios.get(`${backendUrl}/api/v1/theaters`, {
      params,
    });

    return response;
  },
};

export default theaterApi;
