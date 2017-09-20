const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Client = require('./Client');

const server = express();

const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());
server.use(morgan("combined"));

server.get('/clients/:uniqueID', (req, res) => {
  const { uniqueID } = req.params;
  Client.findById(uniqueID, (err, client) => {
    if(err) {
      res.status(STATUS_USER_ERROR);
      res.json('Error finding client');
    }
    res.json(client);
  });
});

server.get('/clients', (req, res) => {
  Client.find({}, (err, clients) => {
    if(err) {
      res.status(STATUS_USER_ERROR);
      res.json('Error finding clients');
    }
    res.json(clients);
  });
});

server.post('/clients', (req, res) => {
  const client = new Client(req.body).save((err, savedClient) => {
    if(err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    }
    res.status(201);
    res.json(savedClient);
  });
});

server.delete('/clients/:uniqueID', (req, res) => {
  const { uniqueID } = req.params;
  Client.findByIdAndRemove(uniqueID, (err, client) => {
    if(err) {
      res.status(STATUS_USER_ERROR);
      res.json('Error finding client');
    }
    res.json(client);
  });
});
module.exports = server;
