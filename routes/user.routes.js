const express = require("express");
const userRouter = express.Router();
const { getMyProfile, updateMyProfile } = require("../controllers/user.controller");
const {authMiddleware} = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadMiddleware");

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, upload.single("profilePic"), updateMyProfile);

module.exports = {  userRouter };
