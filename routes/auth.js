const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express();
const { User } = require('../models/users');

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid Email');

  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(400).send('Invalid Password');

  const token = User.generateAuthToken();

  res.send(token);
});

function validateUser(user) {
  const schema = {
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

module.exports = router;
