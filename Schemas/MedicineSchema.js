const mongoose = require("mongoose");
// console.log(user-icon)
const medicineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    duration: [{
        type: String,
        required: true
    }],
    image: {
        type: String
    },
    instructions: {
        type: String
    }
});



module.exports = mongoose.model('Medicines', medicineSchema);