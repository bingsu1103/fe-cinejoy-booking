import axios from "../configs/axios.config";
const userApi = {
  getAllUsers: async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendUrl}api/v1/users`);
    return response;
  },
};
export default userApi;
