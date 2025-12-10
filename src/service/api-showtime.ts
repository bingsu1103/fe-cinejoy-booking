/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../configs/axios.config";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const showtimeApi = {
  // ✅ Lấy danh sách suất chiếu (phân trang)
  getAll: (page: number, size: number) => {
    return axios.get(
      `${backendUrl}/api/v1/showtimes?page=${page}&size=${size}`
    );
  },

  // ✅ Tạo suất chiếu
  create: (data: any) => {
    return axios.post(`${backendUrl}/api/v1/showtimes`, data);
  },

  // ✅ Cập nhật suất chiếu
  update: (id: number, data: any) => {
    return axios.put(`${backendUrl}/api/v1/showtimes/${id}`, data);
  },

  // ✅ Xóa suất chiếu
  delete: (id: number) => {
    return axios.delete(`${backendUrl}/api/v1/showtimes/${id}`);
  },

  // ✅ Lấy chi tiết 1 suất chiếu (nếu cần)
  getById: (id: number) => {
    return axios.get(`${backendUrl}/api/v1/showtimes/${id}`);
  },
};

export default showtimeApi;
