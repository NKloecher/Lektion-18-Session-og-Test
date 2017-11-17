var app = require('../server.js');
var request = require('supertest');
var should = require('should');

/*
MAN skal exporte app/server i server.js for at det virker - se bunden af server.js
 */
describe('integration test - promise', function () {
    it("get('/') test", function () {
        return request(app)
            .get('/')
            .expect(300)
            .expect('Content-Type', /html/);
    });

});

