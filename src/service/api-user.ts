import axios from "../configs/axios.config";
const userApi = {
  getAllUsers: async (page: number, size: number) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(
      `${backendUrl}/api/v1/users?page=${page}&size=${size}`
    );
    return response;
  },
};
export default userApi;
