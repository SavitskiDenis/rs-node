const CipheringTransform = require('./ciphering_transform');

class CaesarTransform extends CipheringTransform {
    constructor (encoding = true) {
        let config;
        if (encoding) {
            // encoding config
            config = {
                convertUpperCode: (code) => String.fromCharCode(code === 90 ? 65 : code + 1),
                convertLowerCode: (code) => String.fromCharCode(code === 122 ? 97 : code + 1)
            }
        }   else {
            // decoding config
            config = {
                convertUpperCode: (code) => String.fromCharCode(code === 65 ? 90 : code - 1),
                convertLowerCode: (code) => String.fromCharCode(code === 97 ? 122 : code - 1)
            }
        }
        super(config);
    }
}

module.exports = CaesarTransform;