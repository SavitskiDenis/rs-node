const { expect, describe } = require('@jest/globals');
const { Rot8Transform } = require('../../src/transforms');

const ENCODE_TEXT = 'This is';

describe('Rot8Transform stream tests', () => {
    // Encode symbols
    test('test correct encode \'A\' symbol', () => {
        const code = 'A'.charCodeAt(0);
        const expectedSymbol = 'I';

        const result = Rot8Transform.encodeUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct encode \'a\' symbol', () => {
        const code = 'a'.charCodeAt(0);
        const expectedSymbol = 'i';

        const result = Rot8Transform.encodeLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct encode \'Z\' symbol', () => {
        const code = 'Z'.charCodeAt(0);
        const expectedSymbol = 'H';

        const result = Rot8Transform.encodeUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct encode \'z\' symbol', () => {
        const code = 'z'.charCodeAt(0);
        const expectedSymbol = 'h';

        const result = Rot8Transform.encodeLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });


    // Decode symbols
    test('test correct decode \'I\' symbol', () => {
        const code = 'I'.charCodeAt(0);
        const expectedSymbol = 'A';

        const result = Rot8Transform.decodeUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct decode \'i\' symbol', () => {
        const code = 'i'.charCodeAt(0);
        const expectedSymbol = 'a';

        const result = Rot8Transform.decodeLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct decode \'H\' symbol', () => {
        const code = 'H'.charCodeAt(0);
        const expectedSymbol = 'Z';

        const result = Rot8Transform.decodeUpperCode(code);

        expect(result).toEqual(expectedSymbol);
    });

    test('test correct decode \'h\' symbol', () => {
        const code = 'h'.charCodeAt(0);
        const expectedSymbol = 'z';

        const result = Rot8Transform.decodeLowerCode(code);

        expect(result).toEqual(expectedSymbol);
    });


    // Tranform text
    test('test for correct text encode', () => {
        const expected = 'Bpqa qa';
    
        const transform = new Rot8Transform(true);
        let result = '';
        let chunk;
        transform.write(ENCODE_TEXT);
        while ((chunk = transform.read()) !== null) {
            result += chunk .toString();
        }
    
        expect(result).toEqual(expected);
    });
    
    test('test for correct text decode', () => {
        const decodedText = 'Bpqa qa';
    
        const transform = new Rot8Transform(false);
        let result = '';
        let chunk;
        transform.write(decodedText);
        while ((chunk = transform.read()) !== null) {
            result += chunk .toString();
        }
    
        expect(result).toEqual(ENCODE_TEXT);
    });
});