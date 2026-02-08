# Installation & Setup Guide

Complete step-by-step guide to set up iGyan Setu locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## System Requirements

- RAM: 4GB minimum, 8GB recommended
- Storage: 2GB free space
- OS: Windows, macOS, or Linux

## Installation Steps

### 1. Clone or Extract the Project

```bash
# If you have it as a folder, navigate to it
cd Gyansetu
```

### 2. Backend Setup

#### Step 1: Navigate to backend directory
```bash
cd backend
```

#### Step 2: Install dependencies
```bash
npm install
```

This will install all required packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- And more...

#### Step 3: Create environment file
```bash
# Copy the example file
cp .env.example .env

# Or on Windows
copy .env.example .env
```

#### Step 4: Configure MongoDB

Edit the `.env` file and set your MongoDB URI:

**Option A: Using MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/igyan-setu
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

To get MongoDB Atlas URI:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Create a database user
5. Get the connection string
6. Replace `<password>` and database name in the URI

**Option B: Using Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/igyan-setu
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

Make sure MongoDB is running:
```bash
# On Windows (if installed)
mongod

# On macOS with Homebrew
brew services start mongodb-community
```

#### Step 5: Seed the database (optional)
```bash
node seed.js
```

This creates demo users and sample courses:
- Student: `student@demo.com` / `password`
- Instructor: `instructor@demo.com` / `password`
- Admin: `admin@demo.com` / `password`

#### Step 6: Start the backend server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected: [connection info]
```

✅ **Backend is ready at: http://localhost:5000**

---

### 3. Frontend Setup

#### Step 1: Open new terminal and navigate to frontend
```bash
cd frontend
```

#### Step 2: Install dependencies
```bash
npm install
```

Installs React, Tailwind CSS, Axios, React Router, and other packages.

#### Step 3: Create environment file
```bash
# Copy the example file
cp .env.example .env

# Or on Windows
copy .env.example .env
```

#### Step 4: Configure environment
Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Step 5: Start the development server
```bash
npm start
```

The app will automatically open in your browser at:
```
http://localhost:3000
```

✅ **Frontend is ready!**

---

## Verify Installation

### Check Backend API

Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "Server is running"
}
```

### Test Login

Navigate to `http://localhost:3000` and use demo credentials:
- Email: `student@demo.com`
- Password: `password`

---

## Docker Setup (Alternative)

If you prefer to use Docker:

### Prerequisites
- Docker [Download](https://www.docker.com/products/docker-desktop)
- Docker Compose (included with Docker Desktop)

### Steps

```bash
# Navigate to project root
cd Gyansetu

# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017 (internal)

To stop:
```bash
docker-compose down
```

---

## Environment Variables Explained

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/igyan-setu` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key_here` |
| `JWT_EXPIRE` | Token expiration time | `7d` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name (optional) | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key (optional) | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary secret (optional) | `your_secret` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## Troubleshooting

### MongoDB Connection Error
```
Error connecting to MongoDB: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running
- Check your MONGODB_URI is correct
- If using MongoDB Atlas, whitelist your IP

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in .env file
- Or kill the process: `npx kill-port 5000`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure backend is running
- Check REACT_APP_API_URL matches backend server
- Verify CORS is enabled in server.js

### Dependencies Installation Fails
```
npm ERR! code ERESOLVE
```
**Solution:**
```bash
npm install --legacy-peer-deps
```

### Build Fails
**Clear cache and reinstall:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Development Workflow

### Backend Development
```bash
cd backend

# Install new package
npm install package-name

# Run in development mode with auto-reload
npm run dev

# Run tests
npm test
```

### Frontend Development
```bash
cd frontend

# Install new package
npm install package-name

# Run development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## Useful Commands

### Backend
```bash
# Start development server
npm run dev

# Start production server
npm start

# View MongoDB data
mongosh
  > use igyan-setu
  > db.users.find()

# Seed database
node seed.js
```

### Frontend
```bash
# Start development server
npm start

# Build for production
npm run build

# Eject CRA (⚠️ irreversible)
npm run eject
```

---

## Next Steps

After successful installation:

1. **Explore the platform:**
   - Create an account or use demo credentials
   - Browse courses
   - Enroll in a course

2. **Create sample content:**
   - Login as instructor
   - Create a course
   - Add lessons and assessments

3. **Test all features:**
   - Try student enrollment
   - Submit quizzes and assignments
   - View analytics (admin)

4. **Read documentation:**
   - Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
   - Review code structure in README.md
   - Explore individual files

---

## Performance Tips

### Backend
- Use connection pooling for MongoDB
- Enable caching for frequently accessed data
- Implement pagination for large datasets
- Use indexing for faster queries

### Frontend
- Use React.lazy() for code splitting
- Implement virtual scrolling for long lists
- Optimize images
- Use local storage for caching

---

## Security Checklist

Before deployment:

- [ ] Change all default credentials
- [ ] Generate strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set up environment variables
- [ ] Configure CORS properly
- [ ] Enable MongoDB authentication
- [ ] Set secure cookie options
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use CSRF tokens

---

## Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review error logs carefully
3. Check MongoDB connection
4. Verify environment variables
5. Ensure all ports are available
6. Check browser console for frontend errors

---

## Support

For more help:
- Check API documentation at [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Review code comments
- Check GitHub issues (if available)
- Contact support or open an issue

---

**Congratulations! 🎉 Your iGyan Setu platform is ready!**

Start learning and teaching! 📚✨
