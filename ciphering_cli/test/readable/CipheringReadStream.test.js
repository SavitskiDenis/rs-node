const { expect, describe } = require('@jest/globals');
const fs = require('fs');
const CipheringReadStream = require('../../src/readable/ciphering_read_stream');

jest.mock('fs');

describe('CipheringReadStream tests', () => {

    beforeAll(() => {
        require('fs').__setFiles([
            { path: 'text.txt', content: 'This is data2!!!!!', isFile: true }
        ]);
    });

    test('test read from text.txt', () => {
        const stream = new CipheringReadStream('text.txt');

        stream.on('data', chunk => {
            expect(chunk.toString()).toEqual('This is data2!!!!!');
        });
    });

    test('test read from incorrect file', () => {
        const expectedErr = new Error('No such file \'text1.txt\'');

        const stream = new CipheringReadStream('text1.txt');

        stream.on('error', err => {
            expect(err).toEqual(expectedErr);
        });
    });

    test('test readFileSync to be called with \'text.tx\' option', () => {
        const stream = new CipheringReadStream('text.txt');

        stream.read();

        expect(fs.readFileSync).toBeCalledWith('text.txt');
    });
});