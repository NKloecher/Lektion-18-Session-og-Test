var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var company = new Schema({
    name: String,
    hours: Number,
    employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}] // 0..* link to Employee
});
company.methods.toString = function() {
    return this.name + ", hours: " + this.hours;
};

module.exports = mongoose.model('Company', company);