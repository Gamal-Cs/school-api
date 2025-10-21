const jwt = require("jsonwebtoken");
const { User } = require("../models/model.user");
const { Teacher } = require("../models/model.teacher");
const { Student } = require("../models/model.student");
const bcrypt = require("bcrypt");

async function signupController(req, res) {
  try {
    const { name, email, password, role, profilePic } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["admin", "teacher", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, role, profilePic });
    await user.save();
    if (role === "student") {
      const { dob, class: studentClass } = req.body;

      if (!dob || !studentClass) {
        return res
          .status(400)
          .json({ message: "Student class and DOB are required" });
      }

      await Student.create({
        user: user._id,
        dob,
        class: studentClass,
      });
    } else if (role === "teacher") {
      const { subject, phone } = req.body;
      if (!subject || !phone) {
        return res
          .status(400)
          .json({ message: "Teacher subject and phone are required" });
      }
      await Teacher.create({
        user: user._id,
        subject,
        phone,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function logoutController(req, res) {
  res.clearCookie("AccessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logout successful" });
}

module.exports = { signupController, loginController, logoutController };
