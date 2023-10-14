// Import express
const express = require('express');
// Import connection.js
const db = require('./config/connection');
// Import routes
const routes = require('./routes');

// Set PORT variable to the environment variable or 3001
const PORT = process.env.PORT || 3001;
// Set app variable to use the express function
const app = express();

// Set up middleware for express.js app to handle URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Set up middleware for express.js app to handle JSON data
app.use(express.json());
// Set up express.js to use the created routes
app.use(routes);

// Function to start the connection to the database on the specified port.
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API on port ${PORT}!`);
  });
});
