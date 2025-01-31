import axios from "axios";

const options = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && error.response.data?.message === "Token expired decode") {
      console.log("uinauthorized redirect to login.");

      window.location.href = "/login/?session=end";

      localStorage.removeItem("user");
      alert("Session Expired");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default API;
