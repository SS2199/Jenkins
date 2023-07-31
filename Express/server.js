const express = require('express');
const cors = require('cors');
const Jenkins = require('jenkins'); // Make sure to use the correct require statement
const router = require('./router');
const config = require('./config');

const app = express();
const port = 4000; // Choose a suitable port for your server

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Create a Jenkins client instance
const jenkinsClient = new Jenkins({
  baseUrl: config.jenkinsUrl, // Adjust the URL to your Jenkins server
  promisify: true, // Use this if you want to use async/await with Jenkins API calls
  headers: {
    Authorization: `Basic ${Buffer.from(`${config.jenkinsUsername}:${config.jenkinsApiToken}`).toString('base64')}`,
  },
});

// Middleware to add Jenkins client to request object
app.use((req, res, next) => {
  req.jenkins = jenkinsClient;
  next();
});

// Use the Jenkins router
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
