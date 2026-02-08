import apiClient from "./api";

export const authService = {
  register: (data) => {
    return apiClient.post("/auth/register", data);
  },

  login: (email, password) => {
    return apiClient.post("/auth/login", { email, password });
  },

  verifyToken: () => {
    return apiClient.get("/auth/verify");
  },

  getCurrentUser: () => {
    return apiClient.get("/auth/me");
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
};
