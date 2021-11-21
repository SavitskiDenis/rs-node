const { expect, describe } = require('@jest/globals');
const { spawn } = require('child_process');
const getStreamsArrayByConfig = require('../../src/utils/getStreamsArrayByConfig');

describe('getStreamsArrayByConfig tests', () => {

    test('test getStreamsArrayByConfig', () => {
        const streams = getStreamsArrayByConfig({
            inputPath: null,
            outputPath: null,
            transforms: [ { type: 'A', encoding: true } ]
        });

        expect(streams.length).toEqual(3);
    });

    test('test getStreamsArrayByConfig', () => {
        const streams = getStreamsArrayByConfig({
            inputPath: null,
            outputPath: null,
            transforms: [ { type: 'A', encoding: true }, { type: 'C', encoding: true }, { type: 'R', encoding: true } ]
        });

        expect(streams.length).toEqual(5);
    });

    test('test getStreamsArrayByConfig', () => {
        const streams = getStreamsArrayByConfig({
            inputPath: 'input.txt',
            outputPath: 'output.txt',
            transforms: []
        });

        expect(streams.length).toEqual(2);
    });
});