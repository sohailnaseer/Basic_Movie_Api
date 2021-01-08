const express = require('express');
const router = express();
const { Customer, validateCustomer } = require('../models/customers');

router.get('/', async (req, res) => {
  const result = await Customer.find();
  res.send(result);
});

router.get('/:id', async (req, res) => {
  try {
    const result = await Customer.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const customer = new Genre({
      name: req.body.name
    });
    const result = await customer.save();
    res.send(`The Genre ${result} Has Been Added Successfully`);
  } catch (error) {
    return res.send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const result = await Customer.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name
      },
      new: true
    });
    res.send(`The Genre ${result} Has Been Updated Successfully`);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Customer.findByIdAndRemove(req.params.id);
    res.send(`The Genre ${result} Has Been Deleted Successfully`);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
