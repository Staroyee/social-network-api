const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const validator = require('validator');

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
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: 'Invalid email address',
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;