const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const forgotPasswordController = require("../controllers/forgotPasswordController");
const otpVerifyController = require("../controllers/otpVerifyController");
const multer = require("multer");
const path = require("path");
const rateLimit = require("express-rate-limit"); // Import rate-limiter

//rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // for 5 minutes
  max: 5, // 5 attempts per ip address
  message: "Too many login attempts, please try again after 5 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Set up multer for file upload
const storage = multer.memoryStorage(); // Store image in memory for later use
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

// Apply rate limiter only to the login route
router.post("/users/signin", loginLimiter, userController.signIn);

router.post("/users/signup", userController.signUp);
router.post("/users/verify-otp", otpVerifyController.verifyOtp);
router.post("/users/request-password-reset", forgotPasswordController.requestPasswordReset);
router.post("/users/verify-otp", forgotPasswordController.verifyOtp);
router.post("/users/reset-password", forgotPasswordController.resetPassword);
router.get("/users/profile/:email", userController.getProfile);
router.post("/users/editProfile/:email", userController.editProfile);
router.post("/users/addLanguages/:email", userController.addLanguages);
router.get("/users", userController.getAllUsers);
router.get(`/DirectResetPassword/:email`, userController.directResetPassword);
router.get("/SendResetEmail", userController.sendResetEmail);
router.post("/users/addskill", userController.Addskill);

router.post(
  "/edit-image/:email",
  upload.single("image"),
  userController.EditImage
);

module.exports = router;
