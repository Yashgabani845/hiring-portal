const express=require('express');
const router=express.Router();
const assessmentController=require('../controllers/assessmentController');

router.get('assessments/:jobId',assessmentController.getAssessment);
router.get('/assessmen/:id',assessmentController.getSingleAssessment);
router.post('/assessments/send',assessmentController.postAssessment);
router.get('/assessmen/:id',assessmentController.getAsses);

module.exports=router;