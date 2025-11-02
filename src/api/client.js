import axios from "axios";

export const baseURL = "http://localhost:8080/shorten";

const api = axios.create({
  baseURL: `${baseURL}`, // adjust to your Quarkus base path
});

export default api;
