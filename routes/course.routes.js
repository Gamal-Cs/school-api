const express = require("express");
const courseRouter = express.Router();
const {
  createCourse,
  updateCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
} = require("../controllers/course.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

// Public routes
courseRouter.get("/", authMiddleware, getAllCourses);
courseRouter.get("/:id", authMiddleware, getCourseById);

// Admin or teacher can create/update/delete
courseRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "teacher"),
  createCourse
);
courseRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "teacher"),
  updateCourse
);
courseRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "teacher"),
  deleteCourse
);

module.exports = { courseRouter };
