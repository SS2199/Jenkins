const express = require('express');
const router = express.Router();
const jenkinsController = require('./jenkinsController');

// Error handling function
function handleError(res, error, defaultMessage) {
  const status = error.response?.status || 500;
  const data = error.response?.data || { message: defaultMessage };
  res.status(status).json(data);
}

// Higher-order function for error handling
function withErrorHandling(handler, defaultMessage) {
  return async (req, res) => {
    try {
      const response = await handler(req);
      res.json(response);
    } catch (error) {
      handleError(res, error, defaultMessage);
    }
  };
}

// Endpoint to create Jenkins job
router.post('/createJob', withErrorHandling(jenkinsController.createJob, 'Error creating job'));

// Endpoint to get Jenkins build details
//router.get('/job/:jobName/build/:buildNumber', withErrorHandling(jenkinsController.getBuildDetails, 'Error fetching build details'));

// Endpoint to get Jenkins job details
router.get('/job/:jobName', withErrorHandling(jenkinsController.getJobDetails, 'Error fetching job details'));

router.get('/job/:jobName/:buildNumber/api/json', jenkinsController.getBuildDetails);

module.exports = router;
