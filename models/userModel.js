const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  apiKey: { type: String, unique: true },
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
