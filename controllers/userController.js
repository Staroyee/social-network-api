// Import the User model for use inside this document.
const { User } = require("../models");

// The following are async functions. They are being exported to the userRoutes file for express.js.
module.exports = {
  // Function to return all existing users in the database
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Function to return a single user by id
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Function to create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body).select("-__v");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to update a users details by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      ).select("-__v");
      if (!user) {
        return res.status(404).json({
          message: "No user with this id",
        });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Function to delete a user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId).select("-__v");
      if (!user) {
        return res.status(404).json({
          message: "No user with this id",
        });
      }
      return res.status(200).json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Function to add a friend by id using the params for userId and friendId 
  async addFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findById(userId).select("-__v");
      if (!user) {
        return res.status(404).json({
          message: "No user with this id",
        });
      }
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ error: 'Friend already exists' });
      }
      user.friends.push(friendId);
      await user.save();
      res.json({ message: 'Friend added', user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Function to delete a friend by id using the params for userId and friendId
  async deleteFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findById(userId).select("-__v");
      if (!user) {
        return res.status(404).json({
          message: "No user with this id",
        });
      };
      const friendIndex = user.friends.indexOf(friendId);
      if (friendIndex === -1) {
        return res.status(400).json({ message: 'Friend not found' });
      };
      user.friends.splice(friendIndex, 1);
      await user.save();
      res.json({ message: 'Friend removed', user })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  },
};
