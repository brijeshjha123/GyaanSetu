import apiClient from "./api";

export const enrollmentService = {
  enrollCourse: (courseId) => {
    return apiClient.post("/enrollments", { courseId });
  },

  getEnrolledCourses: (params) => {
    return apiClient.get("/enrollments", { params });
  },

  getEnrollmentDetails: (id) => {
    return apiClient.get(`/enrollments/${id}`);
  },

  getCourseEnrollments: (courseId, params) => {
    return apiClient.get(`/enrollments/course/${courseId}`, { params });
  },

  updateEnrollmentStatus: (id, status) => {
    return apiClient.put(`/enrollments/${id}`, { status });
  },
};
