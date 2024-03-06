import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token =
      localStorage.getItem("token") || localStorage.getItem("token-admin");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (error?.request?.status === 500) {
    //   window.location.href = "/";
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("token-admin");
    //   toast.error("Vui lòng đăng nhập lại");
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
