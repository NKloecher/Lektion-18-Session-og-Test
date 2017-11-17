var app = require('../app.js');
var controller = require("../controllers/controller");
var request = require('supertest');
var should = require('should');

describe('integration test - promise', function () {
    it("get('/') test", function () {
        return request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });

    it("get('/employee') test", function () {
        return request(app)
            .get('/employee')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (res) {
                res.body.length.should.be.greaterThanOrEqual(2);
                res.body[0].name.should.be.equal('Viggo');
                res.body[1].name.should.be.equal('Ida');
            });
    });

    it("post('/company') test", function () {
        return request(app)
            .post('/company')
            .send({
                'hours': 40,
                'name': 'EAAA'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .then(function (res) {
                res.body.message.should.be.equal('Company saved!');
                return controller.getCompanies();
            })
            .then(res => {
                res.length.should.be.equal(3);
                res[2].name.should.be.equal('EAAA');

            });
    });
});

