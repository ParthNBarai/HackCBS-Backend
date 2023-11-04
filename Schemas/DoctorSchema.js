const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
        street: String,
        city: String,
        state: String,
        postalCode: String,
    },
    medicalDegree: {
        type: String,
        required: true,
    },
    specialties: [String],
    licenseNumber: {
        type: String,
        unique: true,
        required: true,
    },
    npiNumber: {
        type: String,
        unique: true,
    },
    hospitalAffiliations: [String],
    workSchedule: {
        daysOfWeek: [String],
        hours: [{
            start: String,
            end: String,
        },
        ]
    },
    about: {
        type: String,
    },
    profileImage: {
        type: String, // URL or file reference
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Doctor = mongoose.model('Doctors', doctorSchema);

module.exports = Doctor;
