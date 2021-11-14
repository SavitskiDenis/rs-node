const CipheringTransform = require('./ciphering_transform');

class AtbashTransform extends CipheringTransform {
    constructor () {
        // decoding/encoding config
        const config = {
            convertUpperCode: (code) => {
                const index = code - 65;
                return String.fromCharCode(90 - (index % 35))
            },
            convertLowerCode: (code) => {
                const index = code - 97;
                return String.fromCharCode(122 - (index % 35))
            }
        }
        super(config);
    }
}

module.exports = AtbashTransform;