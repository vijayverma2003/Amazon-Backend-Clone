const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    maxlength: 10,
    minlength: 5,
    required: true,
    type: String,
  },
  email: {
    maxlength: 255,
    required: true,
    type: String,
  },
  password: {
    maxlength: 255,
    minlength: 8,
    required: true,
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    name: Joi.string().min(5).max(10).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
