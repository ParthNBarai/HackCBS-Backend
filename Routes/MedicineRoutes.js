const express = require('express');
const router = express.Router();
const Medicine = require('../Schemas/MedicineSchema')


router.post('/', async (req, res) => {
    try {
        // Extract medicine data from the request body
        const {
            name,
            days,
            duration,
            image,
            instructions
        } = req.body;

        // Create a new medicine using the Mongoose model
        const medicine = new Medicine({
            name,
            days,
            duration,
            image,
            instructions,
        });

        // Save the medicine to the database
        const savedMedicine = await medicine.save();

        res.status(201).json(savedMedicine);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create medicine' });
    }
});

module.exports = router;
