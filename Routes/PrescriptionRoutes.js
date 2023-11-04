const express = require('express');
const router = express.Router();
const Prescription = require('../Schemas/PrescriptionSchema')

router.post('/', async (req, res) => {
    try {
        // Extract prescription data from the request body
        const { appointmentId, medicines } = req.body;

        // console.log(req.body)
        // Create a new prescription using the Mongoose model
        const prescription = new Prescription({
            appointmentId,
            medicines,
        });

        // Save the prescription to the database
        const savedPrescription = await prescription.save();

        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;