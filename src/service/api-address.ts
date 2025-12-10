import axios from "../configs/axios.config";
const addressApi = {
  getAllAddresses: async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendUrl}/api/v1/addresses`);
    return response;
  },
};
export default addressApi;
