import apiClient from "./api";

export const userService = {
  getUserProfile: () => {
    return apiClient.get("/users/profile");
  },

  updateUserProfile: (data) => {
    return apiClient.put("/users/profile", data);
  },

  changePassword: (data) => {
    return apiClient.put("/users/change-password", data);
  },

  getAllUsers: (params) => {
    return apiClient.get("/users", { params });
  },

  getUserById: (id) => {
    return apiClient.get(`/users/${id}`);
  },
};
