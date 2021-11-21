const { expect } = require('@jest/globals');
const parseArgs = require('../../src/args_parser/args_parser');
const { DublicateArgError, MissingArgError, IncorrectConfigError, FileError } = require('../../src/errors');

jest.mock('fs');

describe('CipheringReadStream tests', () => {
    beforeAll(() => {
        require('fs').__setFiles([
            { path: 'input.txt', content: 'This is data2!!!!!', isFile: true },
            { path: 'output.txt', content: 'This is data2!!!!!', isFile: true },
            { path: 'args/', content: null, isFile: false },
        ]);
    });

    // Dublicate options
    test('test error when config option dublicate', () => {
        const uncorrectArgs = ['--config', 'A-A', '-c', 'A-A'];
        const expectedErr = new DublicateArgError('config');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });

    test('test error when config option dublicate', () => {
        const uncorrectArgs = ['--config', 'A-A', '--input', 'input.txt', '-i', 'input.txt'];
        const expectedErr = new DublicateArgError('input');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });

    test('test error when config option dublicate', () => {
        const uncorrectArgs = ['--config', 'A-A', '--output', 'output.txt', '-o', 'output.txt'];
        const expectedErr = new DublicateArgError('output');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });


    // Missing config options
    test('test error when config option missing', () => {
        const uncorrectArgs = ['--output', 'output.txt'];
        const expectedErr = new MissingArgError('config');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });


    // Incorrect config value
    test('test error when config option is incorrect (value: asdasdsad)', () => {
        const uncorrectArgs = ['--config', 'asdasdsad'];
        const expectedErr = new IncorrectConfigError('asdasdsad');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });

    test('test error when config option is incorrect (value: A-)', () => {
        const uncorrectArgs = ['--config', 'A-'];
        const expectedErr = new IncorrectConfigError('');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });

    test('test error when config option is incorrect (value: A1)', () => {
        const uncorrectArgs = ['--config', 'A1'];
        const expectedErr = new IncorrectConfigError('A1');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });

    test('test error when config option is incorrect (value: R-A)', () => {
        const uncorrectArgs = ['--config', 'R-A'];
        const expectedErr = new IncorrectConfigError('R');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });


    // Incorrect file
    test('test error when input option is incorrect', () => {
        const uncorrectArgs = ['--config', 'A-A', '--output', 'output1.txt'];
        const expectedErr = new FileError('Access denied to \'output1.txt\'');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });

    test('test error when input option is dir', () => {
        const uncorrectArgs = ['--config', 'A-A', '--input', 'args/'];
        const expectedErr = new FileError('\'args/\' is not a file');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });

    test('test error when output option is incorrect', () => {
        const uncorrectArgs = ['--config', 'A-A', '--input', 'input1.txt'];
        const expectedErr = new FileError('Access denied to \'input1.txt\'');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });

    test('test error when input option is dir', () => {
        const uncorrectArgs = ['--config', 'A-A', '--output', 'args/'];
        const expectedErr = new FileError('\'args/\' is not a file');

        expect(() => parseArgs(uncorrectArgs)).toThrowError(expectedErr);
    });
});