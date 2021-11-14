const { Readable } = require('stream');
const { readFile } = require('fs');

class CipheringReadStream extends Readable {
    constructor (path) {
        super();

        this.path = path;
    }

    _read () {
        if (this.path !== null && typeof this.path === 'string') {
            readFile(this.path, (err, data) => {
                if (err) {
                    throw err;
                }

                this.push(data);
                this.push(null);
            });
        }   else {
            const dataListener = () => {
                let chunk;
                while ((chunk = process.stdin.read()) !== null) {
                    this.push(chunk);
                }
            }

            process.stdin.on('readable', dataListener);
        }
    }
}

module.exports = CipheringReadStream;