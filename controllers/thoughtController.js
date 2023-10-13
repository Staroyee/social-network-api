// Import the Thought and User models for use inside this document.
const { Thought, User, Reaction } = require("../models");

// The following are async functions. They are being exported to the userRoutes file for express.js.
module.exports = {
  //Function to get all thoughts in the database
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select("-__v");
      return res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Function to get thought by id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      return res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// Function to create a thought, through posting the req.body with the username, and userId. Then to push the thoughts _id to the users thoughts array.
  async createThought(req, res) {
    try {
      const {userId, ...thoughtData } = req.body;
      const user = await User.findById(userId).select("-__v");
      if (!user) {
        return res.status(404).json({ message: 'No user with this id' });
      }
      const thought = await Thought.create(thoughtData);
      user.thoughts.push(thought._id);
      await user.save();
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// Function to update a thought by id. It uses the id in the req.params and sets it using a JSON req.body.
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      ).select("-__v");
      if (!thought) {
        return res.status(404).json({
          message: "No thought with this id",
        });
      }
      return res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

//TODO:
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId).select("-__v");
      if (!thought) {
        return res.status(404).json({
          message: "No thought with this id",
        });
      }
      res.status(200).json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

//TODO:
  async createReaction(req, res) {
    try {
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

//TODO:
  async deleteReaction(req, res) {
    try {
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
