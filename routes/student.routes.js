const express = require("express");
const studentRouter = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

// ✅ POST /api/students — create new student (admin only)
studentRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createStudent
);

// ✅ GET /api/students — list all students (admin, teacher)
studentRouter.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getStudents
);

// ✅ GET /api/students/:id — get one student (admin, teacher)
studentRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getStudentById
);

// ✅ PUT /api/students/:id — update student (admin only)
studentRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateStudent
);

// ✅ DELETE /api/students/:id — delete student (admin only)
studentRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteStudent
);

module.exports = { studentRouter };
