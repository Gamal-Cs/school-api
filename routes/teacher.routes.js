const express = require("express");
const teacherRouter = express.Router();
const { Teacher } = require("../models/model.teacher");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacher.controller");

// ✅ POST /api/teachers — create teacher (admin)
teacherRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createTeacher
);

// ✅ GET /api/teachers — list all teachers (admin, teacher)
teacherRouter.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getAllTeachers
);

// ✅ GET /api/teachers/:id — get one teacher (admin, teacher)
teacherRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  getTeacherById
);

// ✅ PUT /api/teachers/:id — update teacher (admin only)
teacherRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateTeacher
);

// ✅ DELETE /api/teachers/:id — delete teacher (admin only)
teacherRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteTeacher
);

module.exports = { teacherRouter };
