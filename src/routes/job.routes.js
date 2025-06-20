const express = require('express');
const router = express.Router();
const controller = require('../controllers/job.controller');

router.get('/', controller.getAllJobs);
router.get('/:id', controller.getJobById);
router.post('/', controller.createJob);

module.exports = router;