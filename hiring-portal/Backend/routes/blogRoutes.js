const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/create-blog', blogController.postBlog);
router.get('/all-blog', blogController.getAllBlogs);
router.delete('/delete-all', blogController.deleteAllBlogs);
router.delete('/delete-by-id/:id', blogController.deleteBlog);
router.get('/get-by-id/:id', blogController.getBlog);

module.exports = router;