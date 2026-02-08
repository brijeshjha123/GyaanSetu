const Quiz = require("../models/Quiz");
const Assignment = require("../models/Assignment");
const QuizSubmission = require("../models/QuizSubmission");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// ========== QUIZ CONTROLLERS ==========

// Create quiz
const createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      courseId,
      lessonId,
      questions,
      passingScore,
      timeLimit,
      attemptLimit,
      showCorrectAnswers,
      shuffleQuestions,
    } = req.body;

    if (!title || !courseId || !questions) {
      return res.status(400).json({
        message: "Title, courseId, and questions are required",
      });
    }

    // Check if course belongs to instructor
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const quiz = new Quiz({
      title,
      description,
      course: courseId,
      lesson: lessonId || null,
      questions,
      passingScore: passingScore || 50,
      timeLimit: timeLimit || 0,
      attemptLimit: attemptLimit || -1,
      showCorrectAnswers: showCorrectAnswers !== false,
      shuffleQuestions: shuffleQuestions || false,
    });

    await quiz.save();

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quizzes by course
const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course: req.params.courseId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quiz by ID
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit quiz
const submitQuiz = async (req, res) => {
  try {
    const { quizId, enrollmentId, answers, timeTaken } = req.body;

    if (!quizId || !enrollmentId || !answers) {
      return res.status(400).json({
        message: "Quiz ID, enrollment ID, and answers are required",
      });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment || enrollment.student.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check attempt limit
    const attemptCount = await QuizSubmission.countDocuments({
      student: req.user.id,
      quiz: quizId,
    });

    if (quiz.attemptLimit > 0 && attemptCount >= quiz.attemptLimit) {
      return res.status(400).json({ message: "Attempt limit exceeded" });
    }

    // Calculate score
    const processedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[answer.questionIndex];
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      return {
        questionIndex: answer.questionIndex,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
      };
    });

    const correctCount = processedAnswers.filter((a) => a.isCorrect).length;
    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = score >= quiz.passingScore;

    const submission = new QuizSubmission({
      student: req.user.id,
      quiz: quizId,
      enrollment: enrollmentId,
      answers: processedAnswers,
      score: correctCount,
      totalScore: totalQuestions,
      percentage: score,
      isPassed,
      timeTaken: timeTaken || 0,
      attemptNumber: attemptCount + 1,
    });

    await submission.save();

    res.status(201).json({
      message: "Quiz submitted successfully",
      submission,
      score,
      isPassed,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quiz submissions
const getQuizSubmissions = async (req, res) => {
  try {
    const { quizId } = req.params;
    const submissions = await QuizSubmission.find({ quiz: quizId })
      .populate("student", "firstName lastName email");

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========== ASSIGNMENT CONTROLLERS ==========

// Create assignment
const createAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      courseId,
      lessonId,
      submissionType,
      instructions,
      attachments,
      dueDate,
      maxScore,
    } = req.body;

    if (!title || !courseId || !description) {
      return res.status(400).json({
        message: "Title, courseId, and description are required",
      });
    }

    // Check if course belongs to instructor
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const assignment = new Assignment({
      title,
      description,
      course: courseId,
      lesson: lessonId || null,
      submissionType: submissionType || "both",
      instructions,
      attachments: attachments || [],
      dueDate,
      maxScore: maxScore || 100,
    });

    await assignment.save();

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get assignments by course
const getAssignmentsByCourse = async (req, res) => {
  try {
    const assignments = await Assignment.find({ course: req.params.courseId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit assignment
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, enrollmentId, textSubmission, fileUrl, fileName } =
      req.body;

    if (!assignmentId || !enrollmentId) {
      return res.status(400).json({
        message: "Assignment ID and enrollment ID are required",
      });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment || enrollment.student.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check if already submitted
    const existingSubmission = await AssignmentSubmission.findOne({
      assignment: assignmentId,
      enrollment: enrollmentId,
    });

    if (existingSubmission) {
      return res.status(400).json({ message: "Already submitted" });
    }

    const isLate = assignment.dueDate && new Date() > assignment.dueDate;

    const submission = new AssignmentSubmission({
      assignment: assignmentId,
      student: req.user.id,
      enrollment: enrollmentId,
      textSubmission: textSubmission || null,
      fileUrl: fileUrl || null,
      fileName: fileName || null,
      isLate,
      status: "submitted",
    });

    await submission.save();

    res.status(201).json({
      message: "Assignment submitted successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Grade assignment
const gradeAssignment = async (req, res) => {
  try {
    const { score, feedback } = req.body;

    const submission = await AssignmentSubmission.findById(req.params.id)
      .populate("assignment")
      .populate("enrollment");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Check if user is instructor
    const assignment = await Assignment.findById(submission.assignment._id);
    const course = await Course.findById(assignment.course);

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    submission.score = score;
    submission.feedback = feedback;
    submission.status = "graded";
    submission.gradedBy = req.user.id;
    submission.gradedAt = new Date();

    await submission.save();

    res.status(200).json({
      message: "Assignment graded successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get assignment submissions
const getAssignmentSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await AssignmentSubmission.find({
      assignment: assignmentId,
    })
      .populate("student", "firstName lastName email")
      .populate("gradedBy", "firstName lastName");

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzesByCourse,
  getQuizById,
  submitQuiz,
  getQuizSubmissions,
  createAssignment,
  getAssignmentsByCourse,
  submitAssignment,
  gradeAssignment,
  getAssignmentSubmissions,
};
