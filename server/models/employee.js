const mongoose = require('mongoose');
const validator = require('validator');

const Employee = mongoose.model('Employee', {
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  workingSince: {
    type: Number,
    required: true,
    default: null
  },
  groups: {
    type: Array,
    default: []
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = { Employee };
