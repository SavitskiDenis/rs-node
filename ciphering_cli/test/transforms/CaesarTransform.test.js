const { expect, describe } = require('@jest/globals');
const { CaesarTransform } = require('../../src/transforms');

const ENCODE_TEXT = 'This is';

describe('CaesarTransform stream tests', () => {
    // Encode symbols
    test('test correct encode \'A\' symbol', () => {
        const code = 'A'.charCodeAt(0);
        const expectedSymbol = 'B';

        const result = CaesarTransform.encodeUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct encode \'a\' symbol', () => {
        const code = 'a'.charCodeAt(0);
        const expectedSymbol = 'b';

        const result = CaesarTransform.encodeLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct encode \'Z\' symbol', () => {
        const code = 'Z'.charCodeAt(0);
        const expectedSymbol = 'A';

        const result = CaesarTransform.encodeUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct encode \'z\' symbol', () => {
        const code = 'z'.charCodeAt(0);
        const expectedSymbol = 'a';

        const result = CaesarTransform.encodeLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });


    // Decode symbols
    test('test correct decode \'B\' symbol', () => {
        const code = 'B'.charCodeAt(0);
        const expectedSymbol = 'A';

        const result = CaesarTransform.decodeUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct decode \'b\' symbol', () => {
        const code = 'b'.charCodeAt(0);
        const expectedSymbol = 'a';

        const result = CaesarTransform.decodetLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct decode \'A\' symbol', () => {
        const code = 'A'.charCodeAt(0);
        const expectedSymbol = 'Z';

        const result = CaesarTransform.decodeUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct decode \'a\' symbol', () => {
        const code = 'a'.charCodeAt(0);
        const expectedSymbol = 'z';

        const result = CaesarTransform.decodetLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });


    // Tranform text
    test('test for correct text encode', () => {
        const expected = 'Uijt jt';
    
        const transform = new CaesarTransform(true);
        let result = '';
        let chunk;
        transform.write(ENCODE_TEXT);
        while ((chunk = transform.read()) !== null) {
            result += chunk .toString();
        }
    
        expect(result).toEqual(expected);
    });
    
    test('test for correct text decode', () => {
        const decodedText = 'Uijt jt';
    
        const transform = new CaesarTransform(false);
        let result = '';
        let chunk;
        transform.write(decodedText);
        while ((chunk = transform.read()) !== null) {
            result += chunk .toString();
        }
    
        expect(result).toEqual(ENCODE_TEXT);
    });
});