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

describe('#disable()', function() {
    let newTopicId;

    // Test /GET topics
    it('/GET Topics', function(done) {
        chai.request(baseURL)
        .get('/api/topics')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.be.an('array');
            expect(res.body.success.length).to.eql(0);
            done();
        });
    });

    // Test /POST topics
    it('/POST new Topics', function(done) {
        chai.request(baseURL)
        .post('/api/topics/')
        .send({
            'title': 'test title',
        })
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.have.property('_id');
            newTopicId = res.body.success._id;
            done();
        });
    });

    // Test /PUT topics
    it('/PUT new votes in Topic', function(done) {
        chai.request(baseURL)
        .put('/api/topics/'+newTopicId)
        .send({
            'title': 'test title',
        })
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.have.property('_id');
            expect(res.body.success._id).to.be.eq(newTopicId);
            done();
        });
    });
});
