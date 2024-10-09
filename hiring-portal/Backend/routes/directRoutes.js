const express=require('express');
const router=express.Router();
const directController=require('../controllers/directController');

router.post('/compile',directController.compile);
router.post('/endtest',directController.endTest);
router.get('/result/:email/:assessmentId',directController.res);

module.exports=router;