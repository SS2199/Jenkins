const axios = require('axios');
const config = require('./config');

async function sendJenkinsRequest(method, url, data = null) {
  const auth = Buffer.from(`${config.jenkinsUsername}:${config.jenkinsApiToken}`).toString('base64');
  const headers = { Authorization: `Basic ${auth}` };

  try {
    const response = await axios({ method, url, data, headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error making Jenkins API request' };
  }
}

async function createJob(jobName, pipelineScript) {
  const jobConfigXML = `
    <flow-definition plugin="workflow-job@2.40">
      <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@2.93">
        <script>${pipelineScript}</script>
        <sandbox>true</sandbox>
      </definition>
    </flow-definition>
  `;

  const url = `${config.jenkinsUrl}/createItem?name=${encodeURIComponent(jobName)}`;
  return await sendJenkinsRequest('post', url, jobConfigXML);
}

async function getBuildDetails(jobName, buildNumber) {
  const url = `${config.jenkinsUrl}/job/${encodeURIComponent(jobName)}/build/${buildNumber}/api/json`;
  return await sendJenkinsRequest('get', url);
}

async function getJobDetails(jobName) {
  const url = `${config.jenkinsUrl}/job/${encodeURIComponent(jobName)}/api/json`;
  return await sendJenkinsRequest('get', url);
}

module.exports = {
  createJob,
  getBuildDetails,
  getJobDetails,
};
