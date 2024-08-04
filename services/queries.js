import api from "@/configs/api";

export const featchSession = () =>
  api.get("/api/session").then((res) => res.data);
