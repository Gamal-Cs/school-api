const { app } = require("./app");
const { connectDB } = require("./config/db");
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(() => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
  });
