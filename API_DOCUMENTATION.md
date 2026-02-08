# iGyan Setu API Documentation

Complete API reference for the iGyan Setu e-learning platform.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 📌 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "student" // or "instructor"
}

Response (201):
{
  "message": "User registered successfully",
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response (200):
{
  "message": "Login successful",
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Verify Token
```http
GET /auth/verify
Authorization: Bearer <token>

Response (200):
{
  "message": "Token is valid",
  "user": {
    "id": "...",
    "role": "student"
  }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "_id": "...",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "student",
  ...
}
```

---

## 👤 User Endpoints

### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "I'm a passionate learner",
  "phone": "+919876543210",
  "profilePicture": "https://..."
}
```

### Change Password
```http
PUT /users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "currentpass123",
  "newPassword": "newpass456"
}
```

---

## 📚 Course Endpoints

### Get All Courses (Public)
```http
GET /courses?category=Web%20Development&search=react&page=1&limit=10
```

Query Parameters:
- `category`: Filter by category
- `search`: Search in title and description
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

Response (200):
```json
{
  "courses": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Get Course Details
```http
GET /courses/:courseId
```

### Create Course (Instructor)
```http
POST /courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Web Development Basics",
  "description": "Learn HTML, CSS, and JavaScript",
  "category": "Web Development",
  "level": "Beginner",
  "isFree": true,
  "price": 0,
  "thumbnail": "https://..."
}
```

### Update Course (Instructor)
```http
PUT /courses/:courseId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  ...
}
```

### Delete Course (Instructor)
```http
DELETE /courses/:courseId
Authorization: Bearer <token>
```

### Get Instructor Courses (Instructor)
```http
GET /courses/instructor/my-courses?page=1&limit=10
Authorization: Bearer <token>
```

---

## 📖 Lesson Endpoints

### Get Course Lessons
```http
GET /lessons/course/:courseId
```

### Create Lesson (Instructor)
```http
POST /lessons
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Introduction to HTML",
  "description": "Learn HTML basics",
  "courseId": "...",
  "videoUrl": "https://video-stream-url.com/video.mp4",
  "duration": 45,
  "order": 1,
  "resources": [
    {
      "title": "HTML Cheat Sheet",
      "url": "https://..."
    }
  ],
  "transcript": "Optional video transcript"
}
```

### Update Lesson (Instructor)
```http
PUT /lessons/:lessonId
Authorization: Bearer <token>
Content-Type: application/json
```

### Delete Lesson (Instructor)
```http
DELETE /lessons/:lessonId
Authorization: Bearer <token>
```

---

## 📝 Quiz Endpoints

### Get Quizzes by Course
```http
GET /assessments/quiz/course/:courseId
```

### Create Quiz (Instructor)
```http
POST /assessments/quiz
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "HTML Basics Quiz",
  "description": "Test your HTML knowledge",
  "courseId": "...",
  "lessonId": "...",
  "questions": [
    {
      "question": "What does HTML stand for?",
      "options": [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language"
      ],
      "correctAnswer": 0,
      "explanation": "HTML stands for Hyper Text Markup Language"
    }
  ],
  "passingScore": 70,
  "timeLimit": 30,
  "attemptLimit": 3,
  "showCorrectAnswers": true,
  "shuffleQuestions": false
}
```

### Submit Quiz (Student)
```http
POST /assessments/quiz/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "quizId": "...",
  "enrollmentId": "...",
  "answers": [
    {
      "questionIndex": 0,
      "selectedAnswer": 1
    }
  ],
  "timeTaken": 600
}

Response (201):
{
  "message": "Quiz submitted successfully",
  "submission": { ... },
  "score": 85,
  "isPassed": true
}
```

---

## 📋 Assignment Endpoints

### Get Assignments by Course
```http
GET /assessments/assignment/course/:courseId
```

### Create Assignment (Instructor)
```http
POST /assessments/assignment
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Build a Personal Website",
  "description": "Create a responsive personal website",
  "courseId": "...",
  "lessonId": "...",
  "submissionType": "both",
  "instructions": "Follow the requirements...",
  "attachments": [
    {
      "title": "Design Template",
      "url": "https://..."
    }
  ],
  "dueDate": "2024-02-28",
  "maxScore": 100
}
```

### Submit Assignment (Student)
```http
POST /assessments/assignment/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "assignmentId": "...",
  "enrollmentId": "...",
  "textSubmission": "My solution...",
  "fileUrl": "https://...",
  "fileName": "solution.zip"
}
```

### Grade Assignment (Instructor)
```http
PUT /assessments/assignment/:submissionId/grade
Authorization: Bearer <token>
Content-Type: application/json

{
  "score": 95,
  "feedback": "Excellent work! Well done."
}
```

---

## ✅ Enrollment Endpoints

### Enroll in Course (Student)
```http
POST /enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "..."
}
```

### Get Enrolled Courses (Student)
```http
GET /enrollments?page=1&limit=10
Authorization: Bearer <token>
```

### Get Enrollment Details
```http
GET /enrollments/:enrollmentId
Authorization: Bearer <token>
```

### Get Course Enrollments (Instructor)
```http
GET /enrollments/course/:courseId?page=1&limit=10
Authorization: Bearer <token>
```

### Update Enrollment Status
```http
PUT /enrollments/:enrollmentId
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed" // "active", "completed", "dropped"
}
```

---

## 📊 Progress Endpoints

### Update Lesson Progress
```http
POST /progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "enrollmentId": "...",
  "lessonId": "...",
  "watchTimeSeconds": 1500,
  "status": "completed" // "not-started", "in-progress", "completed"
}
```

### Get Enrollment Progress
```http
GET /progress/:enrollmentId
Authorization: Bearer <token>

Response (200):
{
  "enrollment": { ... },
  "progress": [...],
  "completedCount": 3,
  "totalLessons": 10,
  "completionPercentage": 30
}
```

### Get Course Progress Summary (Instructor)
```http
GET /progress/course/:courseId
Authorization: Bearer <token>

Response (200):
{
  "courseId": "...",
  "totalEnrollments": 50,
  "averageCompletion": 65,
  "progressData": [...]
}
```

---

## 👨‍💼 Admin Endpoints

### Get Platform Analytics
```http
GET /admin/analytics
Authorization: Bearer <admin-token>

Response (200):
{
  "totalUsers": 1500,
  "totalStudents": 1200,
  "totalInstructors": 50,
  "totalCourses": 30,
  "approvedCourses": 28,
  "totalEnrollments": 5000,
  "averageStudentsPerCourse": 167
}
```

### Get All Users
```http
GET /admin/users?role=student&page=1&limit=10
Authorization: Bearer <admin-token>
```

### Toggle User Status
```http
PUT /admin/users/:userId/toggle-status
Authorization: Bearer <admin-token>
```

### Delete User
```http
DELETE /admin/users/:userId
Authorization: Bearer <admin-token>
```

### Get Pending Courses
```http
GET /admin/courses/pending?page=1&limit=10
Authorization: Bearer <admin-token>
```

### Approve Course
```http
PUT /admin/courses/:courseId/approve
Authorization: Bearer <admin-token>
```

### Reject Course
```http
PUT /admin/courses/:courseId/reject
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "reason": "Course content does not meet standards"
}
```

### Get All Categories
```http
GET /admin/categories
Authorization: Bearer <admin-token>
```

### Create Category
```http
POST /admin/categories
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Artificial Intelligence",
  "description": "AI and Machine Learning courses",
  "icon": "🤖"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "message": "Error description",
  "error": "Additional details"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding:
- Request rate limiting per IP
- API key-based rate limiting
- User-based rate limiting

---

## Testing

Use tools like Postman or cURL to test the API:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

For more information, visit the main README.md file.
