import axios from "axios";

const api = axios.create({
  baseURL: "https://jewe-2w4e.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
