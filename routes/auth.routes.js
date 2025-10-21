const express = require("express");
const { signupController, loginController, logoutController } = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/register", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

module.exports = { authRouter };