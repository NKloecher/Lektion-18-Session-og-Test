var app = require('../app.js');
var controller = require("../controllers/controller");
var should = require('should');

describe('controller test - promise', function () {
    it('getCompanies test', function () {
        return controller.getEmployees()
            .then(function (res) {
                    res.body.length.should.be.greaterThanOrEqual(2);
                    res.body[0].name.should.be.equal('Viggo');
                    res.body[1].name.should.be.equal('Ida');
            }
        );
    });
});

