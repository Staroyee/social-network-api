// Import express Router
const router = require('express').Router();
// Import the API routes
const apiRoutes = require('./api');

// Set default routes for the API calls
router.use('/api', apiRoutes);

// If the route does not match an existing route, send error message
router.use((req, res) => res.send('Wrong route!'));

// Export routes to be used inside the main index.js file.
module.exports = router;
