const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    maxlength: 255
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, name: this.name },
    config.get('jwtPrivateKey')
  );
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(100)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
