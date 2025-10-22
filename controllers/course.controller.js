const Course = require("../models/course.model");
const Teacher = require("../models/teacher.model");

async function createCourse(req, res) {
  try {
    const { title, code, description, teacher, maxStudents } = req.body;

    if (!title || !code || !teacher) {
      return res
        .status(400)
        .json({ message: "Title, code, and teacher are required" });
    }

    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ message: "Course code already exists" });
    }

    const teacherExists = await Teacher.findById(teacher);
    if (!teacherExists) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const course = await Course.create({
      title,
      code,
      description,
      teacher,
      maxStudents,
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllCourses(req, res) {
  try {
    const courses = await Course.find().populate("teacher", "subject phone");
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getCourseById(req, res) {
  try {
    const course = await Course.findById(req.params.id).populate(
      "teacher",
      "subject phone"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const { title, code, description, maxStudents } = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.title = title || course.title;
    course.code = code || course.code;
    course.description = description || course.description;
    course.maxStudents = maxStudents || course.maxStudents;

    await course.save();

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteCourse(req, res) {
  try {
    const deleted = findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createCourse,
  updateCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
};
