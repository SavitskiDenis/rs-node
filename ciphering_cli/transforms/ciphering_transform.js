const { Transform } = require('stream');

class CipheringTransform extends Transform {
    _transform (chunk, _, cb) {
        this.push(chunk);
        cb();
    }
}

module.exports = CipheringTransform;