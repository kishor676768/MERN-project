
const mongoose = require("mongoose");
const Registration = new mongoose.Schema({
    name: { type: String, require: true },
    phone: { type: String, require: true},
    email: { type: String, require: true},
    address: { type: String, require: true},
    course : { type: String, require: true},
});
module.exports = mongoose.model("Registration", Registration);