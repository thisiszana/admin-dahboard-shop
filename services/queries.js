import api from "@/configs/api";

export const featchSession = () =>
  api.get("/api/session").then((res) => res.data);

export const featchTask = ({ queryKey }) =>
  api.get(`api/tasks/${queryKey[1]}`).then((res) => res.data);

export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/user");
    if (!response.ok) {
      throw new Error("Failed to fetch users data");
    }

    const users = await response.json();

    return {
      users,
      status: "success",
      code: 200,
    };
  } catch (error) {
    return {
      users: null,
      status: "failed",
      code: 500,
    };
  }
};

export const getUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/user/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users data");
    }

    const user = await response.json();

    return {
      user,
      status: "success",
      code: 200,
    };
  } catch (error) {
    return {
      user: null,
      status: "failed",
      code: 500,
    };
  }
};
