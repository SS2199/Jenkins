const jenkinsService = require('./jenkinsService');

async function createJob(req, res) {
  const jobName = req.body.jobName;
  const pipelineScript = req.body.pipelineScript;

  try {
    const response = await jenkinsService.createJob(jobName, pipelineScript);
    res.json(response);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error creating job' });
  }
}

async function getBuildDetails(req, res) {
  const jobName = req.params.jobName;
  const buildNumber = req.params.buildNumber;

  try {
    const response = await jenkinsService.getBuildDetails(jobName, buildNumber);
    res.json(response);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error fetching build details' });
  }
}

async function getJobDetails(req, res) {
  const jobName = req.params.jobName;

  try {
    const response = await jenkinsService.getJobDetails(jobName);
    res.json(response);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error fetching job details' });
  }
}

module.exports = {
  createJob,
  getBuildDetails,
  getJobDetails,
};
