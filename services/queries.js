import api from "@/configs/api";

export const featchSession = () =>
  api.get("/api/session").then((res) => res.data);

export const featchTask = ({ queryKey }) =>
  api.get(`api/tasks/${queryKey[1]}`).then((res) => res.data);
