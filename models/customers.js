const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  phone: {
    type: String,
    validate: {
      validator: v => v.length === 11
    },
    required: true
  },
  isGold: {
    type: Boolean,
    default: false
  }
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(customer, schema);
}

const Customer = mongoose.model('customer', customerSchema);

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
