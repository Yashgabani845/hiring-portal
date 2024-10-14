const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const path = require("path");

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
router.post("/users/signup", userController.signUp);
router.post("/users/signin", userController.signIn);
router.get("/users/profile", userController.getProfile);
router.get("/users", userController.getAllUsers);
router.get(`/DirectResetPassword/:email`, userController.directResetPassword);
router.get("/SendResetEmail", userController.sendResetEmail);

router.post(
  "/edit-image/:email",
  upload.single("image"),
  userController.EditImage
);
module.exports = router;
