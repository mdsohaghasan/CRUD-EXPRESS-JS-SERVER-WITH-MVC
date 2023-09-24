const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    reuire: true,
  },
  name: {
    type: String,
    reuire: true,
  },
  email: {
    type: String,
    unique: [true, "email already exists!"],
    lowercase: true,
    reuire: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },

  // role: {
  //   type: String,
  //   enum: ["user", "admin"],
  //   default: "user",
  //   required: [true, "Please specify user role"]
  // },

  password: {
    type: String,
    reuire: true,
    minlength: 6,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
