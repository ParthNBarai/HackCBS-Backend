const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../Authentication/GetBearerToken')
const Doctor = require('../Schemas/DoctorSchema');
const fetchuser = require('../Middleware/fetchuser'); // Import the doctor schema

// Doctor registration
router.post('/register', async (req, res) => {
    // console.log(req.body)
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            email,
            phoneNumber,
            address,
            medicalDegree,
            specialties,
            licenseNumber,
            npiNumber,
            hospitalAffiliations,
            workSchedule,
            about,
            username,
            password,
            latitude,
            longitude
        } = req.body;

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const doctor = new Doctor({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            email,
            phoneNumber,
            address,
            medicalDegree,
            specialties,
            licenseNumber,
            npiNumber,
            hospitalAffiliations,
            workSchedule,
            about,
            username,
            password: hashedPassword,
            "address.lat": latitude,
            "address.long": longitude,
        });

        // console.log(doctor)
        const savedDoctor = await doctor.save();

        // Include the doctor's ID in the response
        const token = await auth.tokenGenerate({ username: doctor.email, id: savedDoctor._id }, req, res);
        // console.log(token)

        res.status(201).json({ message: 'Doctor registered successfully', token });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username or email already in use' });
        }
        return res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body;

    Doctor.findOne({ username }, async (err, doctor) => {
        // console.log(doctor)
        if (err || !doctor) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const result = bcrypt.compareSync(req.body.password, doctor.password);
        // console.log(result)
        // console.log(isMatch)
        if (result) {
            // console.log("INDIA")
            const token = await auth.tokenGenerate({ username: doctor.username, id: doctor._id }, req, res)
            // console.log(token)
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    });
});

// CRUD operations for doctors
router.get('/', fetchuser, async (req, res) => {
    // Implement doctor retrieval logic here
    const doctor = await Doctor.find();
    res.status(200).json({ message: 'Get doctor', doctor });
});

router.get('/single', fetchuser, async (req, res) => {
    const doctorId = req.user.id; // Get the doctor's ID from the JWT token
    await Doctor.findById(doctorId, (err, doctor) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Get doctor', doctor });
    });
});


router.put('/', fetchuser, async (req, res) => {
    // Implement doctor update logic here
    const doctorId = req.user.id; // Get the doctor's ID from the route parameter
    const updateData = req.body; // Data to be updated

    await Doctor.findByIdAndUpdate(doctorId, updateData, { new: true }, (err, updatedDoctor) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: `Update doctor with ID: ${doctorId}`, doctor: updatedDoctor });
    });
    res.status(200).json({ message: `Update doctor with ID: ${req.user.id}` });
});

router.delete('/', fetchuser, async (req, res) => {
    // Implement doctor delete logic here
    const doctorId = req.user.id; // Get the doctor's ID from the route parameter

    await Doctor.findByIdAndRemove(doctorId, (err, doctor) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: `Delete doctor with ID: ${doctorId}` });
    });
    res.status(200).json({ message: `Delete doctor with ID: ${req.user.id}` });
});

module.exports = router;
