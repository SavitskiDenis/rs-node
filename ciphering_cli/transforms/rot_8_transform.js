const CipheringTransform = require('./ciphering_transform');

class RotEightTransform extends CipheringTransform {
    constructor (encoding) {
        let config;
        if (encoding) {
            // encoding config
            config = {
                convertUpperCode: RotEightTransform.encodeUpperCode,
                convertLowerCode: RotEightTransform.encodeLowerCode 
            }
        }   else {
            // decoding config
            config = {
                convertUpperCode: RotEightTransform.decodeUpperCode,
                convertLowerCode: RotEightTransform.decodeLowerCode
            }
        }
        super(config);
    }

    static encodeUpperCode (code) {
        return String.fromCharCode(code + 8 > 90 ? 64 + (code + 8 - 90) : code + 8);
    }

    static encodeLowerCode (code) {
        return String.fromCharCode(code + 8 > 122 ? 96 + (code + 8 - 122) : code + 8);
    }

    static decodeUpperCode (code) {
        return String.fromCharCode(code - 8 < 65 ? 91 - (65 - code + 8) : code - 8);
    }

    static decodeLowerCode (code) {
        return String.fromCharCode(code - 8 < 97 ? 123 - (97 - code + 8) : code - 8);
    }
}

module.exports = RotEightTransform;