const express = require('express');
const router = express.Router();
const jenkinsController = require('./jenkinsController');

// Endpoint to create Jenkins job
router.post('/createJob', jenkinsController.createJob);
router.get('/job/:jobName/build/:buildNumber', jenkinsController.getBuildDetails);
router.get('/job/:jobName', jenkinsController.getJobDetails);

module.exports = router;
