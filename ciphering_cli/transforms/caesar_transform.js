const CipheringTransform = require('./ciphering_transform');

class CaesarTransform extends CipheringTransform {
    constructor (encoding) {
        let config;
        if (encoding) {
            // encoding config
            config = {
                convertUpperCode: CaesarTransform.encodeUpperCode,
                convertLowerCode: CaesarTransform.encodeLowerCode
            }
        }   else {
            // decoding config
            config = {
                convertUpperCode: CaesarTransform.decodeUpperCode,
                convertLowerCode: CaesarTransform.decodetLowerCode
            }
        }
        super(config);
    }

    static encodeUpperCode (code) {
        return String.fromCharCode(code === 90 ? 65 : code + 1);
    }

    static encodeLowerCode (code) {
        return String.fromCharCode(code === 122 ? 97 : code + 1);
    }

    static decodeUpperCode (code) {
        return String.fromCharCode(code === 65 ? 90 : code - 1);
    }

    static decodetLowerCode (code) {
        return String.fromCharCode(code === 97 ? 122 : code - 1);
    }
}

module.exports = CaesarTransform;