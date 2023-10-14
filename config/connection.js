// Require mongoose and "connect, connection" to connect to the database
const { connect, connection } = require('mongoose');

// Set LocalHost URL to access the server and name the database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

// Connect using the above URL string
connect(connectionString);

// Export the connection for use inside index.js file
module.exports = connection;
