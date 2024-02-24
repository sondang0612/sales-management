import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
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
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
