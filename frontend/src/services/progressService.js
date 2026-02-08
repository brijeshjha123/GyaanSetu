import apiClient from "./api";

export const progressService = {
  updateLessonProgress: (data) => {
    return apiClient.post("/progress", data);
  },

  getEnrollmentProgress: (enrollmentId) => {
    return apiClient.get(`/progress/${enrollmentId}`);
  },

  getLessonProgress: (lessonId, enrollmentId) => {
    return apiClient.get(`/progress/lesson/${lessonId}/${enrollmentId}`);
  },

  getCourseProgressSummary: (courseId) => {
    return apiClient.get(`/progress/course/${courseId}`);
  },
};
