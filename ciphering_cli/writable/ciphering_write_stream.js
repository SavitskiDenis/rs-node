const { Writable } = require('stream');
const { writeFile } = require('fs');

class CipheringWriteStream extends Writable {
    constructor (path) {
        super();

        this.path = path;
    }

    _write (chunk, encoding, cb) {
        if (this.path) {
            writeFile(this.path, chunk, { flag: 'a' }, () => {
                cb(null);
            });
        }   else {
            process.stdout._write(chunk, encoding, cb);
        }
    }
}

module.exports = CipheringWriteStream;