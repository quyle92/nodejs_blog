const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/f8_education_dev');
        console.log('Connected to MongoDB.')
    } catch (error) {
        console.log('Connected failed!')
    }
}

module.exports = { connect };