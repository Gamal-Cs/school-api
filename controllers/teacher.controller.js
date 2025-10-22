const { Teacher } = require("../models/model.teacher");

async function createTeacher(req, res) {
  try {
    const { user, subject, phone } = req.body;
    if (!user || !subject)
      return res.status(400).json({ message: "User and subject are required" });

    const teacher = new Teacher({ user, subject, phone });
    await teacher.save();
    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllTeachers(req, res) {
  try {
    const teachers = await Teacher.find().populate("user", "name email");
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getTeacherById(req, res) {
  try {
    const teacher = await Teacher.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateTeacher(req, res) {
  try {
    const { subject, phone } = req.body;
    const updated = await Teacher.findByIdAndUpdate(
      req.params.id,
      { subject, phone },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher updated", teacher: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteTeacher(req, res) {
  try {
    const deleted = await Teacher.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
