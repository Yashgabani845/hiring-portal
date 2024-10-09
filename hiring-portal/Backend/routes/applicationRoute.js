const express=require('express');
const router=express.Router();
const applicationController=require('../controllers/applicationController');

router.delete('/applications/:id',applicationController.deleteApplication);
router.post('/applications',applicationController.postApplication);
router.get('/applications/:jobId',applicationController.getSingleApplication);
router.get('/applicationss/:applicantId',applicationController.getApplicant);

module.exports=router;

