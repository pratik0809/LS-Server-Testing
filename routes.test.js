const mongoose = require('mongoose');
mongoose.connect('http://localhost/testroutes');

const Pets = require('./Pets');
const server = require('./server')

const chai = require('chai')
const { expect } = chai;
const chaiHTTP = require('chai-http')

chai.use(chaiHTTP);

describe('/clients', () => {
  let clientID;
  const newClient = {
    clientName: 'Satish',
    species: 'German Shepherd',
    owner: {
      name: 'Satish',
      address: 'Toledo, OH',
      phoneNumber: 4196096668,
      email: 'satish@gmail.com'
    }
  };
  beforeEach((done) => {
    new Pet(newClient).save((err, savedClient) => {
      if(err) {
        console.log(err);
        done(err);
      }
      clientID = savedClient.id;
      done();
    })
  })
  afterEach((done) => {
    Pet.remove({}, (err) => {
      if(err) {
        console.log(err);
        return done();
      }
    });
  });

  describe('GET /clients', () => {
    it('Should get an individual client', (done) => {
      chai.request(server)
        .get('/clients')


    });
    it('Should get all clients');
  });
  describe('POST /clients', () => {

  });
  describe('DELETE /clients/:uniqueID', () => {

  });
  describe('PUT /clients/:uniqueID', () => {

  });
});
