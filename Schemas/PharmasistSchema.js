const mongoose = require('mongoose');

const pharmacistSchema = new mongoose.Schema({
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
  pharmacyName: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    unique: true,
    required: true,
  },
  npiNumber: {
    type: String,
    unique: true,
  },
  services: [String], // e.g., "Prescription Filling," "Immunization"
  operatingHours: {
    daysOfWeek: [String],
    hours: {
      open: String,
      close: String,
    },
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

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;
