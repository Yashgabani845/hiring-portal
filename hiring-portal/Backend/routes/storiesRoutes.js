const express = require("express");
const { getPosts, savePost } = require("../controllers/postsController.js");

const router = express.Router();

router.get("/getposts", getPosts);
router.post("/saveposts", savePost);

module.exports = router;
