// Import express Router
const router = require("express").Router();

// Import async functions from controller files
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Define the routes and methods for the async functions
// Get all users, create a user
router.route("/").get(getUsers).post(createUser);
// Get user by id, update a user, delete a user
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);
// Add a friend, delete a friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export routes
module.exports = router;
