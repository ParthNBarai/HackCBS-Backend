const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointments',
    required: true,
  },
  medicines: [
    {
      medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicines',
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prescriptions', prescriptionSchema);
