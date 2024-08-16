import axios from "axios";

const baseURL = process.env.BASE_URL;

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL,
  headers,
});

export default api;
