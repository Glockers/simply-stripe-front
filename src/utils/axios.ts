import axios from "axios";

const SERVER_URL = "http://localhost:5000/api";

export const server = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});
