
const { connectDB } = require('./config/db');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

connectDB()
.then(() => {
  app.listen(() => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error('Failed to start server:', error.message);
});

