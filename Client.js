const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  timeOfVisit: {
    type: Date,
    default: Date.now
  },
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

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
