const { expect, describe } = require('@jest/globals');
const { AtbashTransform } = require('../../src/transforms');

const ENCODE_TEXT = 'This is';

describe('AtbashTransform stream tests', () => {
    // Convert symbols
    test('test correct convert \'A\' symbol', () => {
        const code = 'A'.charCodeAt(0);
        const expectedSymbol = 'Z';

        const result = AtbashTransform.convertUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct convert \'a\' symbol', () => {
        const code = 'a'.charCodeAt(0);
        const expectedSymbol = 'z';

        const result = AtbashTransform.convertLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });


    // Tranform text
    test('test for correct AtbashTransform encode', () => {
        const expected = 'Gsrh rh';
    
        const transform = new AtbashTransform(true);
        let result = '';
        let chunk;
        transform.write(ENCODE_TEXT);
        while ((chunk = transform.read()) !== null) {
            result += chunk .toString();
        }
    
        expect(result).toEqual(expected);
    });
    
    test('test for correct AtbashTransform decode', () => {
        const decodedText = 'Gsrh rh';
    
        const transform = new AtbashTransform(false);
        let result = '';
        let chunk;
        transform.write(decodedText);
        while ((chunk = transform.read()) !== null) {
            result += chunk.toString();
        }
    
        expect(result).toEqual(ENCODE_TEXT);
    });
});