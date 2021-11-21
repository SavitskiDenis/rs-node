const { Readable } = require('stream');
const { readFileSync } = require('fs');

class CipheringReadStream extends Readable {
    constructor (path) {
        super();

        this.path = path;
    }

    _read () {
        try {
            const data = readFileSync(this.path);
            this.push(data);
            this.push(null);
        } catch (err) {
            this.emit('error', err);
        }
    }
}

module.exports = CipheringReadStream;