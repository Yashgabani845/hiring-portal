const express=require('express');
const router=express.Router();
const jobController=require('../controllers/jobController');

router.get('/jobs/search',jobController.searchJob);
router.post('/postjob',jobController.postJobs);
router.get('/job',jobController.getAllJob);
router.get('/jobs',jobController.getAllJobs);
router.get('/jobs/:id',jobController.getSingleJob);
router.put('/jobs/:id',jobController.editJob);

module.exports=router;