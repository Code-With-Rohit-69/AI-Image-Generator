import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3003/api",
  withCredentials: true,
});

export default API;
