const crypto = require('crypto');

function generateSessionKey() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = generateSessionKey;