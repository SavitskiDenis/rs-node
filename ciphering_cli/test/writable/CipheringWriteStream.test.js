const { expect, describe } = require('@jest/globals');
const fs = require('fs');
const CipheringWriteStream = require('../../src/writable/ciphering_write_stream');

jest.mock('fs');

describe('CipheringReadStream tests', () => {

    test('test readFileSync to be called with \'text.tx\' option', () => {
        const stream = new CipheringWriteStream('text.txt');

        stream.write('1');

        const buf = Buffer.alloc(1);
        buf[0] = 49;

        expect(fs.writeFileSync).toBeCalledWith('text.txt', buf,  { flag: 'a' });
    });
});