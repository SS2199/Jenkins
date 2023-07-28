const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();
const port = 3000; // Choose a suitable port for your server

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Use the Jenkins router
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
