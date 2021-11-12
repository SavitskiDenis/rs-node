const { Transform } = require('stream');

class CipheringTransform extends Transform {
    constructor (config) {
        super();
        this.config = config;
    }

    transformChunk (chunk) {
        const str = chunk.toString();
        let res = '';
        let code;
        for (const c of str) {
            code = c.charCodeAt(0);
            if (code >= 65 && code <= 90) {
                res += this.config.convertUpperCode(code);
            }   else if (code >= 97 && code <= 122) {
                res += this.config.convertLowerCode(code);
            }   else {
                res += c;
            }
        }
        return res;
    }

    _transform (chunk, _, cb) {
        this.push(this.transformChunk(chunk));
        cb();
    }
}

module.exports = CipheringTransform;