const express = require("express");
const { errorHandling } = require("./middlewares/errorHandling");

const app = express();
const { authRouter } = require("./routes/auth.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the School Management API");
});

app.use("/api/auth", authRouter);

app.use(errorHandling);
module.exports = { app };
