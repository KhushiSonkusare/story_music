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
    originalName: String,
    filename: String,
    path: String,
    contentType: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  registrationId: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp on every save
ipRegistrationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const IpRegistration = mongoose.model('IpRegistration', ipRegistrationSchema);

module.exports = IpRegistration;