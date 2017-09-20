const mongoose = require('mongoose');
const server = require('./server');

mongoose.createConnection('mongodb://localhost/client', { }, (err) => {
    if(err) console.log(err);
    console.log('connected to clients database');
});

server.listen(8080, () => {
    console.log('server listening on port 8080');
});
