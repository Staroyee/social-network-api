// Import the Schema and Types from the mongoose NPM package
const { Schema, Types } = require("mongoose");

// Schema for Reactions
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: [280, "Thought cannot be greater than 280 characters"],
    },
    username: {
      type: String,
      required: true,
    },
    // When a Reaction is created this function within inserts the current date
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => {
        return new Date(createdAt).toDateString();
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Instead of converting this schema to a model, it is exported as a constructor function, so that it can be used to create a reaction that is directly inserted into the Thought model
module.exports = reactionSchema;
