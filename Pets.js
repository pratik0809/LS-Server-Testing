const mongoose = require('mongoose')

const Pet = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  timeOfVisit: Date,
  owner: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  }
});
