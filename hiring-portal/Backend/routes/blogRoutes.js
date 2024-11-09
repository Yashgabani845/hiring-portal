const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");
// Import auth middleware

// Secure routes with authMiddleware
router.post("/create-blog", authMiddleware, blogController.postBlog);
router.get("/all-blog/:page", authMiddleware, blogController.getAllBlogs);
router.delete("/delete-all", authMiddleware, blogController.deleteAllBlogs);
router.delete("/delete-by-id/:id", authMiddleware, blogController.deleteBlog);
router.get("/get-by-id/:id", authMiddleware, blogController.getBlog);

router.get("/get-total-blogs", blogController.GetTotalBlogs);
module.exports = router;
