const crypto = require('crypto');

class ApiKeyUtil {
  generateApiKey() {
    return crypto.randomBytes(32).toString('hex');
  }
}

module.exports = new ApiKeyUtil();
