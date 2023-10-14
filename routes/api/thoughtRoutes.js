// Import express Router
const router = require("express").Router();

// Import async functions from controller files
const { 
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
 } = require("../../controllers/thoughtController");

// Define the routes and methods for the async functions
// Get all thoughts, create a thought
router.route("/").get(getThoughts).post(createThought);
// Get thought by id, update thought, delete thought by id
router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);
// Create a reaction
router.route("/:thoughtId/reactions").post(createReaction)
// Delete a reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// Export routes
module.exports = router;
