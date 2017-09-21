const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testroutes');

const Client = require('./Client');
const server = require('./server')

const chai = require('chai')
const { expect } = chai;
const chaiHTTP = require('chai-http')

chai.use(chaiHTTP);

describe('/clients', () => {
  let clientID;

  const testClient = {
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
    new Client(testClient).save((err, savedClient) => {
      if(err) return done();
      clientID = savedClient.id;
    })
    done();
  });

  afterEach((done) => {
    Client.remove({}, (err) => {
      if(err) return done(err);
    });
    done();
  });

  describe('GET /clients', () => {
    it('Should get an individual client', (done) => {
      chai.request(server)
        .get(`/clients/${clientID}`)
        .end((err, res) => {
          if(err) {
            done(err);
          }
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal('object');
          expect(res.body.clientName).to.equal('Satish');
          done();
        })
    });

    it('Should get all clients', (done) => {
      chai.request(server)
        .get(`/clients`)
        .end((err, res) => {
          if(err) {
            done(err);
          }
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(1);
          expect(res.body[0].clientName).to.equal('Satish');
          done();
        })
    });
  });

  describe('POST /clients', () => {
    it('Should create a new client', (done) => {
      chai.request(server)

      .post(`/clients`)
      .send({
            clientName: 'Matt Higbee',
            species: 'Crazy cat',
            owner: {
              name: 'Matt Higbee',
              address: 'Best Town USA',
              phoneNumber: 12345678910,
              email: 'gethimajob@gmail.com'
            }
      })
        .end((err, res) => {
          if(err) {
            done(err);
          }
          expect(res.status).to.equal(201);
          expect(res.body.clientName).to.equal('Matt Higbee');
          expect(typeof res.body).to.equal('object');
          done();
        })
    });
  });
  describe('DELETE /clients/:uniqueID', () => {
    it('Should delete a client', (done) => {
      chai.request(server)
      .delete(`/clients/${clientID}`)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        expect(res.status).to.equal(200);
        Client.findById(clientID, (err, res)=> {
          if(err) {
            console.log('THIS IS THE ERROR',err);
            return done(err);
          }
          console.log('THIS IS RESPONSE',res);
        expect(res).to.equal(null);
        return done();
        });
      })
    })
  });
  describe('PUT /clients/:uniqueID', () => {
    it('Should update a clients information', (done) => {
      chai.request(server)
      .put(`/clients/${clientID}`)
      .send({
        clientName: 'French Fries',
        species: 'Black Cat',
        owner: {
          name: 'Satish Cat Man',
          address: 'Toledo, OH',
          phoneNumber: 4196096668,
          email: 'satish@gmail.com'
        }
      })
      .end((err, res) => {
        if(err) {
          done(err);
        }
        expect(res.status).to.equal(201);
        expect(res.body.clientName).to.equal('French Fries');
        expect(typeof res.body).to.equal('object');
        done();
      })
    })
  });
});
