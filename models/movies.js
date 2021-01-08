const mongoose = require('mongoose');
const Joi = require('joi');
const { genresSchema } = require('./genres');

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 10,
    maxlength: 50,
    required: true
  },
  numberInStock: {
    type: Number,
    validate: {
      validator: v => v >= 0
    },
    message: 'Stock Can Not Be Less Than 0'
  },
  dailyRentalRate: {
    type: Number,
    validate: {
      validator: v => v >= 0
    },
    message: 'Rental Rate Can Not Be Less Than 0'
  },
  genre: {
    type: genresSchema,
    required: true
  }
});

function validateGenre(genre) {
  const schema = {
    title: Joi.string()
      .min(10)
      .max(50)
      .required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required(),
    genre: {
      name: Joi.string()
        .min(5)
        .max(20)
        .required()
    }
  };
  return Joi.validate(genre, schema);
}

const Movie = mongoose.model('movie', moviesSchema);

module.exports.Movie = Movie;
module.exports.validateMovie = validateGenre;
