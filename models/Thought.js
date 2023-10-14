// Import the Schema and Types from the mongoose package
const { Schema, model } = require("mongoose");
// Import the reactionSchema for use in the model
const reactionSchema = require("./Reaction");

// Schema for the Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Field must not be empty"],
      maxlength: [280, "Thought cannot be greater than 280 characters"],
    },
    // When a Thought is created this function within inserts the current date
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => {
        return new Date(createdAt).toDateString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    // Reactions are stored in an array within each Thought
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Virtual to calculate the count of Reactions on individual Thoughts
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Convert the schema into a model
const Thought = model("Thought", thoughtSchema);

// Export the model for use in the route/controller files.
module.exports = Thought;
