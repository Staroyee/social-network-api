// Import express Router
const router = require('express').Router();
// Import the routes from userRoutes and thoughtRoutes files.
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Set the default routes for users and thoughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export routes for use in the routes/index.js file.
module.exports = router;
