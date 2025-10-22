const express = require("express");
const { errorHandling } = require("./middlewares/errorHandling");

const app = express();
const { authRouter } = require("./routes/auth.routes");
const { studentRouter } = require("./routes/student.routes");
const { userRouter } = require("./routes/user.routes");
const { teacherRouter } = require("./routes/teacher.routes");
const { courseRouter } = require("./routes/course.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the School Management API");
});

app.use("/api/auth", authRouter);
app.use("/api/students", studentRouter);
app.use("/api/users", userRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/courses", courseRouter);

app.use(errorHandling);
module.exports = { app };
