const express = require('express');
const router = express.Router();
const Appointment = require('../Schemas/AppointmentSchema')

router.post('/', async (req, res) => {
    try {
        // Extract appointment data from the request body
        const {
            doctorId,
            patientId,
            appointmentDate,
            appointmentTime,
            status,
        } = req.body;

        // Create a new appointment using the Mongoose model
        const appointment = new Appointment({
            doctorId,
            patientId,
            appointmentDate,
            appointmentTime,
            status,
        });

        // Save the appointment to the database
        const savedAppointment = await appointment.save();

        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create appointment' });
    }
});

module.exports = router;