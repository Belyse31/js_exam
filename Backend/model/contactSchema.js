const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    streetNumber: { type: String },
    additionalInfo: { type: String },
    zipCode: { type: String },
    place: { type: String },
    country: { type: String },
    code: { type: String },
    phoneNumber: { type: Number },
    email: { type: String },

})

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;