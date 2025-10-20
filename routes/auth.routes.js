const express = require("express");
const { signupController, loginController, logoutController } = require("../controllers/auth.controllers");
const authRouter = express.Router();

authRouter.post("/register", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);