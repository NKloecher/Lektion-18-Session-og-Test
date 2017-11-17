"use strict";

var Company = require('../models/Company');
var Employee = require('../models/Employee');

// Returns a promise that resolves when the company is created.
exports.createCompany = function (name, hours) {
    var company = new Company({
        name: name,
        hours: hours
    });
    return company.save();
};

// Returns a promise that resolves when a company is found with the specified id.
exports.getCompany = function (companyId) {
    return Company.findOne({_id: companyId}).exec();
};

// Returns a promise that resolves with an array of all companies. Each company
exports.getCompanies = function () {
    return Company.find().populate('employees').exec();
};

// Returns a promise that resolves when the employee is created
exports.createEmployee = function (titlteste, name, employmentDate, wage, companyId) {
    var employee = new Employee({
        title: title,
        name: name,
        employmentDate: employmentDate,
        wage: wage,
        company: companyId
    });
    return employee.save();
};

// Returns a promise that resolves with an array of all employees. The company
exports.getEmployees = function () {
    return Employee.find().populate('company').exec();
};

// Returns a promise that resolves when an employee is found with the specified id.
exports.getEmployee = function (employeeId) {
    return Employee.findOne({_id: employeeId}).exec();
};

// Returns a promise that resolves when the employee and the company are connected (bidirectional)
exports.connectEmployeeToCompany = function (company, employee) {
    company.employees.push(employee);
    employee.company = company;
    return Promise.all([company.save(), employee.save()]);
};

