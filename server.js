const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Client = require('./Client');

const server = express();

const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());
server.use(morgan("combined"));
mongoose.Promise = global.Promise;

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
  const client = req.body;
  const newClient = new Client({client});
  newClient.save((err, savedClient) => {
    if(err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    }
    res.status(201);
    res.json(savedClient);
  });
});

server.put('/clients/:uniqueID', (req, res) => {
  const { clientID } = req.params;
  const clientToUpdate = req.body
  Client.findById(clientID, (err, foundClient) =>{
    if(err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    }
    foundClient = clientToUpdate;
    Client.save((err, foundClient) => {
      if(err) {
        res.status(STATUS_USER_ERROR);
        res.json(err);
      }
      res.status(201);
      res.json(foundClient);
    });
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
