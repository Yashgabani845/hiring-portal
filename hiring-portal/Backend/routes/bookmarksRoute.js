const express=require('express');
const router=express.Router();
const bookmarksController=require('../controllers/bookmarksController');

router.post('/bookmarks/addBookmark',bookmarksController.addBookmark);
router.delete('/bookmarks/removeJobFromBookmark',bookmarksController.removeJobFromBookmark);
router.get('/bookmarks/getBookmarks',bookmarksController.getBookmarks);