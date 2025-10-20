const { connectDB } = require("./config/db");
const { body, validationResult } = require("express-validator");
const express = require("express");
const errorHandling = require("./middlewares/errorHandling");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(errorHandling);
connectDB()
  .then(() => {
    app.listen(() => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
  });
