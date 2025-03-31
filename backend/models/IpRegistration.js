const mongoose = require('mongoose');

const ipRegistrationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  rights: { 
    type: String, 
    required: true,
    enum: ['exclusive', 'non-exclusive', 'limited']
  },
  files: [{
    filename: String,
    path: String,
    contentType: String
  }],
  registrationId: {
    type: String,
    unique: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const IpRegistration = mongoose.model('IpRegistration', ipRegistrationSchema);

module.exports = IpRegistration;