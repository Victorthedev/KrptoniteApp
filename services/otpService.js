const crypto = require('crypto');
const redisClient = require('../utils/redisClient');

class OtpService {
  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async storeOtp(email, otp, ttl = 300) {
    return new Promise((resolve, reject) => {
      redisClient.setex(email, ttl, otp, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async validateOtp(email, otp) {
    return new Promise((resolve, reject) => {
      redisClient.get(email, (err, storedOtp) => {
        if (err) {
          reject(err);
        } else if (storedOtp === otp) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async deleteOtp(email) {
    return new Promise((resolve, reject) => {
      redisClient.del(email, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = new OtpService();
