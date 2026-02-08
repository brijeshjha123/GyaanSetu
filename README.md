# iGyan Setu - Interactive E-Learning Platform

A comprehensive e-learning platform that provides online courses, assessments, and multimedia learning content with role-based access for students, instructors, and admins.

## 📸 Screenshot

Landing page screenshot (replace `assets/landing-screenshot.png` with the actual image file):

![iGyan Setu Landing](assets/landing-screenshot.png)


## 🚀 Features

### 🏠 Landing Page
- Attractive hero section with platform introduction
- Display of key features
- Popular courses showcase
- Testimonials and ratings
- Public navigation bar (Home, Courses, About, Contact, Login/Signup)

### 🔐 Authentication & Authorization
- Secure Email & Password authentication
- Optional Google OAuth login
- JWT-based authentication
- Role-based access control (Student, Instructor, Admin)
- Separate protected dashboards for each role

### 🎓 Student Features
- Dashboard with enrolled courses
- Course progress tracking
- Resume last watched video
- Browse and search courses by category
- Enroll in free or paid courses
- Access video lessons, quizzes, and assignments
- Submit assignments
- Attempt quizzes with scoring
- View completion status and certificates

### 👨‍🏫 Instructor Features
- Create, edit, and delete courses
- Upload video lessons
- Create quizzes (MCQs) with multiple attempts
- Create assignments with various submission types
- View enrolled students
- Track student performance
- Grade assignments and provide feedback

### 🛠️ Admin Features
- Manage users (view, disable, delete)
- Approve or reject courses before publishing
- Manage course categories
- View platform analytics
- Monitor platform activity

### 🧩 Multimedia Learning
- Video lectures with progress tracking
- MCQ-based quizzes with explanations
- Assignments with file and text submission options
- Student progress tracking per lesson
- Performance analytics

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcryptjs
- **File Storage**: Cloudinary/S3 (configured)
- **Validation**: express-validator

### Frontend
- **Library**: React.js
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: React Icons

## 📋 Project Structure

```
Gyansetu/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Lesson.js
│   │   ├── Quiz.js
│   │   ├── Assignment.js
│   │   ├── Enrollment.js
│   │   ├── Progress.js
│   │   ├── QuizSubmission.js
│   │   ├── AssignmentSubmission.js
│   │   └── Category.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── course.controller.js
│   │   ├── lesson.controller.js
│   │   ├── enrollment.controller.js
│   │   ├── assessment.controller.js
│   │   ├── progress.controller.js
│   │   └── admin.controller.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── course.routes.js
│   │   ├── lesson.routes.js
│   │   ├── enrollment.routes.js
│   │   ├── assessment.routes.js
│   │   ├── progress.routes.js
│   │   └── admin.routes.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   └── ProtectedRoute.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── LandingPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── SignupPage.js
│   │   │   ├── CoursesPage.js
│   │   │   ├── DashboardPage.js
│   │   │   └── dashboards/
│   │   │       ├── StudentDashboard.js
│   │   │       ├── InstructorDashboard.js
│   │   │       └── AdminDashboard.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── courseService.js
│   │   │   ├── enrollmentService.js
│   │   │   ├── progressService.js
│   │   │   ├── userService.js
│   │   │   └── adminService.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/igyan-setu
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses (public)
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (instructor)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Lessons
- `GET /api/lessons/course/:courseId` - Get course lessons
- `POST /api/lessons` - Create lesson (instructor)
- `PUT /api/lessons/:id` - Update lesson
- `DELETE /api/lessons/:id` - Delete lesson

### Quizzes & Assignments
- `GET /api/assessments/quiz/course/:courseId` - Get quizzes
- `POST /api/assessments/quiz` - Create quiz
- `POST /api/assessments/quiz/submit` - Submit quiz
- `GET /api/assessments/assignment/course/:courseId` - Get assignments
- `POST /api/assessments/assignment` - Create assignment
- `POST /api/assessments/assignment/submit` - Submit assignment

### Enrollment
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - Get enrolled courses
- `GET /api/enrollments/:id` - Get enrollment details

### Progress
- `POST /api/progress` - Update lesson progress
- `GET /api/progress/:enrollmentId` - Get enrollment progress

### Admin
- `GET /api/admin/analytics` - Get platform analytics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/courses/pending` - Get pending courses
- `PUT /api/admin/courses/:courseId/approve` - Approve course
- `GET /api/admin/categories` - Get all categories

## 🔐 Demo Credentials

For testing purposes, you can use these demo accounts:

- **Student**: `student@demo.com` / `password`
- **Instructor**: `instructor@demo.com` / `password`
- **Admin**: `admin@demo.com` / `password`

## 📦 Deployment

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables in deployment platform
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Connect GitHub repository to Vercel/Netlify
2. Set `REACT_APP_API_URL` environment variable
3. Deploy

## 🔒 Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens for stateless authentication
- Role-based access control middleware
- CORS enabled for secure cross-origin requests
- Environment variables for sensitive data
- Input validation on all endpoints

## 📝 Best Practices Followed

- Clean, modular code structure
- RESTful API design
- Proper error handling
- Comprehensive middleware authentication
- Responsive UI design
- Component-based architecture
- Service layer for API calls
- Context API for state management

## 🚦 Running Tests

Backend:
```bash
cd backend
npm test
```

Frontend:
```bash
cd frontend
npm test
```

## 📄 License

This project is open source and available under the MIT License.


For support, email support@igyansetu.com or visit our website.

---

**Happy Learning! 📚✨**
