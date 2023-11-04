require('dotenv/config')
const express = require("express");
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const ConnectionDB = require("./database");
// const multer = require('./Middlewares/multer')
app.use(express.json());
ConnectionDB();
//Comments
app.use(cors())
// app.use("/api/image", multer.router)
app.use('/api/patients',require('./Routes/PatientRoutes'))
app.use('/api/doctors',require('./Routes/DoctorRoutes'))



app.listen(port, () => console.log(`Server up and running...at ${port}`))