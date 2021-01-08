const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validateGenre } = require('../models/genres');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const result = await Genre.find();
  res.send(result);
});

router.get('/:id', auth, async (req, res) => {
  try {
    const result = await Genre.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.post('/', auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const genre = new Genre({
      name: req.body.name
    });
    const result = await genre.save();
    res.send(`The Genre ${result} Has Been Added Successfully`);
  } catch (error) {
    return res.send(error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const result = await Genre.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name
      },
      new: true
    });
    res.send('The Genre Has Been Updated Successfully');
  } catch (error) {
    res.send(error.message);
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const result = await Genre.findByIdAndRemove(req.params.id);
    res.send(`The Genre ${result} Has Been Deleted Successfully`);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
