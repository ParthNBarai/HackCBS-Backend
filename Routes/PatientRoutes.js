const express = require('express');
const router = express.Router();
const Patient = require('../Schemas/PatientSchema')
const auth = require('../Authentication/GetBearerToken')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const fetchuser = require('../Middleware/fetchuser');

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        email,
        username,
        password,
        allergies,
        conditions,
        medications,
        latitude,
        longitude
    } = req.body;

    // Hash the password before saving it
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);

    const patient = new Patient({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        email,
        username,
        password: req.body.password,
        "medicalHistory.allergies": allergies,
        "medicalHistory.conditions": conditions,
        "medicalHistory.medications": medications,
        "address.lat" : latitude,
        "address.long" : longitude,
    });

    patient.save(async (err, savedPatient) => {
        if (err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: 'Username or email already in use' });
            }
            return res.status(400).json({ message: 'Registration failed' });
        }
        // Include the patient's ID in the response
        const token = await auth.tokenGenerate({ username: patient.username, id: savedPatient._id }, req, res);
        res.status(201).json({ message: 'Patient registered successfully', token });
    });
});

// Patient login
router.post('/login', async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body;

    Patient.findOne({ username }, async (err, patient) => {
        // console.log(patient)
        if (err || !patient) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const result = compareSync(req.body.password, patient.password);
        // console.log(result)
        // console.log(isMatch)
        if (result) {
            // console.log("INDIA")
            const token = await auth.tokenGenerate({ username: patient.username, id: patient._id }, req, res)
            // console.log(token)
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    });
});

// CRUD operations for patients
router.get('/', fetchuser, async (req, res) => {
    // Implement patient retrieval logic here
    const patients = await Patient.find();
    res.status(200).json({ message: 'Get patients' });
});

router.get('/single', fetchuser, async (req, res) => {
    const patientId = req.user.id; // Get the patient's ID from the JWT token
    await Patient.findById(patientId, (err, patient) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Get patient', patient });
    });
});


router.put('/', fetchuser, async (req, res) => {
    // Implement patient update logic here
    const patientId = req.user.id; // Get the patient's ID from the route parameter
    const updateData = req.body; // Data to be updated

    await Patient.findByIdAndUpdate(patientId, updateData, { new: true }, (err, updatedPatient) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: `Update patient with ID: ${patientId}`, patient: updatedPatient });
    });
    res.status(200).json({ message: `Update patient with ID: ${req.user.id}` });
});

router.delete('/', fetchuser, async (req, res) => {
    // Implement patient delete logic here
    const patientId = req.user.id; // Get the patient's ID from the route parameter

    await Patient.findByIdAndRemove(patientId, (err, patient) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: `Delete patient with ID: ${patientId}` });
    });
    res.status(200).json({ message: `Delete patient with ID: ${req.user.id}` });
});

module.exports = router;