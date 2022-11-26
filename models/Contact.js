const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
     lastname : String,
     firstname : String,
     phone : String,
     email : String,
})

module.exports = mongoose.model('contacts',ContactSchema)