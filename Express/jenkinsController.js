const jenkinsService = require('./jenkinsService');

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

// Controller functions
async function createJob(req) {
  const jobName = req.body.jobName;
  const pipelineScript = req.body.pipelineScript;
  return await jenkinsService.createJob(jobName, pipelineScript);
}

async function getBuildDetails(req) {
  const jobName = req.params.jobName;
  const buildNumber = req.params.buildNumber;
  return await jenkinsService.getBuildDetails(jobName, buildNumber);
}

async function getJobDetails(req) {
  const jobName = req.params.jobName;
  return await jenkinsService.getJobDetails(jobName);
}

module.exports = {
  createJob: withErrorHandling(createJob, 'Error creating job'),
  getBuildDetails: withErrorHandling(getBuildDetails, 'Error fetching build details'),
  getJobDetails: withErrorHandling(getJobDetails, 'Error fetching job details'),
};
