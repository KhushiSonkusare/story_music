const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

module.exports = mongoose.model('Registration', registrationSchema);
