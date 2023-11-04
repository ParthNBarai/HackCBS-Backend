const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        lat: String,
        long: String,
    },
    medicalHistory: {
        allergies: [String],
        conditions: [String],
        medications: [String],
    },

    emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reports'
    }],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
