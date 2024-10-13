const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users/signup", userController.signUp);
router.post("/users/signin", userController.signIn);
router.get("/users/profile", userController.getProfile);
router.get("/users", userController.getAllUsers);
router.get(`/DirectResetPassword/:email`, userController.directResetPassword);
router.get("/SendResetEmail", userController.sendResetEmail);
module.exports = router;
