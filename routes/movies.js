const express = require('express');
const auth = require('../middleware/auth');
const router = express();
const { Movie, validateMovie } = require('../models/movies');

router.get('/', auth, async (req, res) => {
  const result = await Movie.find();
  res.send(result);
});

router.get('/:id', auth, async (req, res) => {
  try {
    const result = await Movie.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.post('/', auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const movie = new Movie({
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        name: req.body.genre.name
      }
    });
    const result = await movie.save();
    res.send(`The Genre ${result} Has Been Added Successfully`);
  } catch (error) {
    return res.send(error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const result = await Movie.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
          name: req.body.genre.name
        }
      },
      new: true
    });
    res.send(`The Genre ${result} Has Been Updated Successfully`);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Movie.findByIdAndRemove(req.params.id);
    res.send(`The Genre ${result} Has Been Deleted Successfully`);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
