const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
var schema = mongoose.Schema;
var userSchema = new schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male"
  },
  address: {
    type: String
  },
  mobileNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
    }
});


userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await jwt.sign({
      password: user.password
    }, process.env.jwt_secret)
  }
  next()
})
module.exports = mongoose.model("user", userSchema);