const axios = require("axios");

const checkConfig = (server) => {
  let config = {};
  switch (server) {
    case "production":
      config = {
        baseURL: "https://admin-dahboard-shop.vercel.app/",
      };
      break;
    case "local":
      config = {
        baseURL: "http://localhost:3000",
      };
      break;
    default:
      break;
  }
  return config;
};

const selectServer = "production";
const { baseURL } = checkConfig(selectServer);

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL,
  headers,
  timeout: 60000,
});

module.exports = api;
