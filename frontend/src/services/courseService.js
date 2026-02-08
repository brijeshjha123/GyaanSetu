import apiClient from "./api";

export const courseService = {
  getAllCourses: (params) => {
    return apiClient.get("/courses", { params });
  },

  getCourseById: (id) => {
    return apiClient.get(`/courses/${id}`);
  },

  createCourse: (data) => {
    return apiClient.post("/courses", data);
  },

  updateCourse: (id, data) => {
    return apiClient.put(`/courses/${id}`, data);
  },

  deleteCourse: (id) => {
    return apiClient.delete(`/courses/${id}`);
  },

  getInstructorCourses: (params) => {
    return apiClient.get("/courses/instructor/my-courses", { params });
  },

  // Lessons
  getLessonsByCourse: (courseId) => {
    return apiClient.get(`/lessons/course/${courseId}`);
  },

  getLessonById: (id) => {
    return apiClient.get(`/lessons/${id}`);
  },

  createLesson: (data) => {
    return apiClient.post("/lessons", data);
  },

  updateLesson: (id, data) => {
    return apiClient.put(`/lessons/${id}`, data);
  },

  deleteLesson: (id) => {
    return apiClient.delete(`/lessons/${id}`);
  },

  // Quizzes
  getQuizzesByCourse: (courseId) => {
    return apiClient.get(`/assessments/quiz/course/${courseId}`);
  },

  getQuizById: (id) => {
    return apiClient.get(`/assessments/quiz/${id}`);
  },

  createQuiz: (data) => {
    return apiClient.post("/assessments/quiz", data);
  },

  submitQuiz: (data) => {
    return apiClient.post("/assessments/quiz/submit", data);
  },

  getQuizSubmissions: (quizId) => {
    return apiClient.get(`/assessments/quiz/${quizId}/submissions`);
  },

  // Assignments
  getAssignmentsByCourse: (courseId) => {
    return apiClient.get(`/assessments/assignment/course/${courseId}`);
  },

  createAssignment: (data) => {
    return apiClient.post("/assessments/assignment", data);
  },

  submitAssignment: (data) => {
    return apiClient.post("/assessments/assignment/submit", data);
  },

  gradeAssignment: (id, data) => {
    return apiClient.put(`/assessments/assignment/${id}/grade`, data);
  },

  getAssignmentSubmissions: (assignmentId) => {
    return apiClient.get(`/assessments/assignment/${assignmentId}/submissions`);
  },
};
