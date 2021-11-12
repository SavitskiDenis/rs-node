const CipheringTransform = require('./ciphering_transform');

class RotEightTransform extends CipheringTransform {
    constructor (encoding = true) {
        let config;
        if (encoding) {
            // encoding config
            config = {
                convertUpperCode: (code) => String.fromCharCode(code + 8 > 90 ? 64 + (code + 8 - 90) : code + 8),
                convertLowerCode: (code) => String.fromCharCode(code + 8 > 122 ? 96 + (code + 8 - 122) : code + 8)
            }
        }   else {
            // decoding config
            config = {
                convertUpperCode: (code) => String.fromCharCode(code - 8 < 65 ? 91 - (65 - code + 8) : code - 8),
                convertLowerCode: (code) => String.fromCharCode(code - 8 < 97 ? 123 - (97 - code + 8) : code - 8)
            }
        }
        super(config);
    }
}

module.exports = RotEightTransform;