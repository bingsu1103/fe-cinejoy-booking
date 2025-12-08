import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// const handleRefreshToken = async () => {
//   const res = await instance.post<IBackendRes<IRefresh>>(
//     "/v1/api/auth/refresh_token"
//   );
//   if (res && res.data) {
//     return res.data.access_token;
//   } else return null;
// };

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response.data || response;
  },
  async (error) => {
    // if (error.config && error.response && error.response.status === 401) {
    //   const access_token = await handleRefreshToken();
    //   if (access_token && error.config) {
    //     error.config.headers = error.config.headers || {};
    //     error.config.headers["Authorization"] = `Bearer ${access_token}`;
    //     localStorage.setItem("access_token", access_token);
    //     return instance.request(error.config);
    //   }
    // }
    return Promise.reject(error.response?.data || error);
  }
);

export default instance;
