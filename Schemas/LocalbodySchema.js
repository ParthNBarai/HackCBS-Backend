const mongoose = require('mongoose');

const localBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  wardInformation: [
    {
      wardNumber: Number,
      area: String,
      caseData: [
        {
          caseType: String,
          numberOfCases: Number,
        },
      ],
    },
  ],
  adminName: String,
  adminEmail: {
    type: String,
    unique: true,
  },
  adminPassword: {
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
});

const LocalBody = mongoose.model('LocalBodies', localBodySchema);

module.exports = LocalBody;
