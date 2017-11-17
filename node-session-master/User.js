var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    email : String,
    pass : String,
});

user.methods.printUser = function () {
    console.log(this.user);
};

module.exports = mongoose.model("User", user);