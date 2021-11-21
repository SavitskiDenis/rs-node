const { Writable } = require('stream');
const { writeFileSync } = require('fs');

class CipheringWriteStream extends Writable {
    constructor (path) {
        super();

        this.path = path;
    }

    _write (chunk, _, cb) {
        writeFileSync(this.path, chunk, { flag: 'a' });
        cb(null);
    }
}

module.exports = CipheringWriteStream;