// Import the Schema and Types from the mongoose NPM package
const { Schema, model } = require("mongoose");
// Import the validator NPM package
const validator = require("validator");

// Schema for the User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        // Validator function calls upon the Validator NPM package to ensure the email is valid
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: "Invalid email address",
      },
    },
    // Thought ids are stored in an array and reference the Thought model for data.
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Friend ids are stored in an array and reference the User model for data.
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Virtual to calculate the count of Friends on individual Users
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Convert the schema into a model
const User = model("User", userSchema);

// Export the model for use in the route/controller files.
module.exports = User;
