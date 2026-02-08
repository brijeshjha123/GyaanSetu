import apiClient from "./api";

export const adminService = {
  getPlatformAnalytics: () => {
    return apiClient.get("/admin/analytics");
  },

  getAllUsers: (params) => {
    return apiClient.get("/admin/users", { params });
  },

  toggleUserStatus: (userId) => {
    return apiClient.put(`/admin/users/${userId}/toggle-status`);
  },

  deleteUser: (userId) => {
    return apiClient.delete(`/admin/users/${userId}`);
  },

  getPendingCourses: (params) => {
    return apiClient.get("/admin/courses/pending", { params });
  },

  approveCourse: (courseId) => {
    return apiClient.put(`/admin/courses/${courseId}/approve`);
  },

  rejectCourse: (courseId, reason) => {
    return apiClient.put(`/admin/courses/${courseId}/reject`, { reason });
  },

  getAllCategories: () => {
    return apiClient.get("/admin/categories");
  },

  createCategory: (data) => {
    return apiClient.post("/admin/categories", data);
  },

  updateCategory: (categoryId, data) => {
    return apiClient.put(`/admin/categories/${categoryId}`, data);
  },

  deleteCategory: (categoryId) => {
    return apiClient.delete(`/admin/categories/${categoryId}`);
  },
};
