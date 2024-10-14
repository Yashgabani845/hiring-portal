const express=require('express');
const router=express.Router();
const otherApiController=require('../controllers/otherApiController');

router.post('/test',otherApiController.test);
router.post('/hire',otherApiController.hire);
router.post('/reject',otherApiController.reject);
router.get('/results/:assessmentId',otherApiController.getResult);
router.post('/subscribe', otherApiController.subscribeNewsletter)
module.exports=router;