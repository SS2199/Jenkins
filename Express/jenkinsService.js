const axios = require('axios');
const config = require('./config');

const authHeader = createAuthHeader(config.jenkinsUsername, config.jenkinsApiToken);

function createAuthHeader(username, apiToken) {
  const auth = Buffer.from(`${username}:${apiToken}`).toString('base64');
  return `Basic ${auth}`;
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

  try {
    const response = await axios.post(`${config.jenkinsUrl}/createItem?name=${encodeURIComponent(jobName)}`, jobConfigXML, {
      headers: { 'Content-Type': 'application/xml', Authorization: authHeader },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating job' };
  }
}

async function getBuildDetails(jobName, buildNumber) {
  try {
    const response = await axios.get(`${config.jenkinsUrl}/job/${encodeURIComponent(jobName)}/build/${buildNumber}/api/json`, {
      headers: { Authorization: authHeader },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching build details' };
  }
}

async function getJobDetails(jobName) {
  try {
    const response = await axios.get(`${config.jenkinsUrl}/job/${encodeURIComponent(jobName)}/api/json`, {
      headers: { Authorization: authHeader },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching job details' };
  }
}

module.exports = {
  createJob,
  getBuildDetails,
  getJobDetails,
};
