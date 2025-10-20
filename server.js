const { app } = require("./app");
const { connectDB } = require("./config/db");
const port = process.env.PORT || 3000;

connectDB();
app.listen(() => {
  console.log(`Server is running on http://localhost:${port}`);
});
