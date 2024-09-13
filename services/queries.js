import api from "@/configs/api";

export const featchSession = () =>
  api.get("/api/session").then((res) => res.data);

export const featchTask = ({ queryKey }) =>
  api.get(`api/tasks/${queryKey[1]}`).then((res) => res.data);

export const getOrders = async () => {
  return api
    .get("/api/orders")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching orders data:", error);
      return null;
    });
};

export const getUsers = async () => {
  return api
    .get("/api/users")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching users data:", error);
      return null;
    });
};

export const getUser = async (id) => {
  return api
    .get(`/api/users/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching user data:", error);
      return null;
    });
};
export const getComments = async () => {
  return api
    .get("/api/comments")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching comments data:", error);
      return null;
    });
};
