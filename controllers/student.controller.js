const Student = require("../models/model.student");

async function createStudent(req, res) {
  try {
    const { user, dob, class: studentClass, documents } = req.body;

    if (!user || !dob || !studentClass)
      return res.status(400).json({ message: "All fields are required" });

    const student = new Student({ user, dob, class: studentClass, documents });
    await student.save();

    res.status(201).json({
      message: "Student record created successfully",
      student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getStudents(req, res) {
  try {
    const students = await Student.find().populate("user", "name email");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function updateStudent(req, res) {
  try {
    const { dob, class: studentClass, documents } = req.body;
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { dob, class: studentClass, documents },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated", student: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteStudent(req, res) {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };
