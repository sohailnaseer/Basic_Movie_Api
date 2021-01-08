const mongoose = require('mongoose');
const Joi = require('joi');

const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  }
});

function validateGenre(course) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(course, schema);
}

const Genre = mongoose.model('Genre', genresSchema);

module.exports.Genre = Genre;
module.exports.genresSchema = genresSchema;
module.exports.validateGenre = validateGenre;
