const { body, validationResult } = require("express-validator");

const userValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters."),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email not valid!"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters.")
    .matches(/[0-9!@#$%^&*]/)
    .withMessage("Password not valid!"),
];
const studentValidation = [
  body("dob")
    .notEmpty()
    .withMessage("Dob is required")
    .isDate()
    .withMessage("Date not valid!"),
  body("class").notEmpty().withMessage("Class is required!"),
];
const courseValidation = [
  body("code")
    .matches(/^[A-Z0-9]+$/)
    .withMessage(
      "Course code must contain only uppercase letters and numbers."
    ),
  body("maxStudents")
    .isInt({ gt: 0 })
    .withMessage("Max students must be a positive number."),
];
const teacherValidation = [
  body("phone")
    .matches(/^[0-9]+$/)
    .withMessage("Phone not valid!"),
  body("subject").notEmpty().withMessage("Subject is required"),
];
module.exports = {
  userValidation,
  courseValidation,
  studentValidation,
  teacherValidation,
};
