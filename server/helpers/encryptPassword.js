const crypto = require('crypto');

function encryptPassword(password) {
    return crypto.createHmac(process.env.ENCRYPT_TYPE, process.env.ENCRYPT_SECRET)
                    .update(password)
                    .digest('hex');
}

module.exports = encryptPassword;