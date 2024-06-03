const crypto = require('crypto');
const User = require('../models/userModel');
const apiKeyUtil = require('../utils/apiKeyUtil');
const emailService = require('../services/emailService');
const otpService = require('../services/otpService');

class AuthController {
  async register(req, res) {
    const { email } = req.body;
    const user = new User({ email });
    user.apiKey = apiKeyUtil.generateApiKey();
    await user.save();

    emailService.sendConfirmationEmail(user.email);

    res.status(201).json({ message: 'User registered. Please check your email for confirmation.' });
  }

  async login(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const otp = otpService.generateOtp();
    await otpService.storeOtp(email, otp);

    emailService.sendOtpEmail(user.email, otp);

    res.status(200).json({ message: 'OTP sent to your email.' });
  }

  async verifyOtp(req, res) {
    const { email, otp } = req.body;
    const isValid = await otpService.validateOtp(email, otp);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    await otpService.deleteOtp(email);

    const token = crypto.randomBytes(16).toString('hex'); 
    res.status(200).json({ token });
  }
}

module.exports = new AuthController();
