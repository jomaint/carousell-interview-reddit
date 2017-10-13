// =====
// API Testing for Topic routes
// =====

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;
const baseURL = 'http://localhost:8000';

chai.use(chaiHttp);


// Test /GET topics
it('/GET Topics', function(done) {
    chai.request(baseURL + '/api/topics')
    .get('/')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.an('array');
        expect(res.body.success.length).to.eql(0);
        done();
    });
});
