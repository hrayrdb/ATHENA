const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    yearOfBirth: { type: Number, required: true },
    educationLevel: { type: String, required: true },
    occupation: { type: String, required: true },
    workingHoursPerDay: { type: Number, required: true },
    momPassed: { type: Boolean, required: true },
    dadPassed: { type: Boolean, required: true },
    parentsDivorced: { type: Boolean, required: true },
    numberOfSiblings: { type: Number, required: true },
    relationshipStatus: { type: String, required: true },
    numberOfChildren: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
