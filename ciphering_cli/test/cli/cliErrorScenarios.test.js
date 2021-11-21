const { expect, describe } = require('@jest/globals');
const { spawn } = require('child_process');

describe('cli error scenarios', () => {

    test('test dublicate config option', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'A-A', '-c', 'A-A']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Duplicate config argument');
        });
    });

    test('test dublicate input option', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'A-A', '-i', './package.json', '-i', './package.json']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Duplicate input argument');
        });
    });

    test('test dublicate output option', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'A-A', '-o', './package.json', '-o', './package.json']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Duplicate output argument');
        });
    });

    test('test config option missing', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-o', './package.json']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Missing config argument');
        });
    });

    test('test input path doesn\'t exist', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'A', '-i', './package1.json']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Incorrect file. Access denied to \'./package1.json\'');
        });
    });

    test('test input path isn\'t file', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'A', '-i', './src']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Incorrect file. \'./src\' is not a file');
        });
    });

    test('test output path doesn\'t exist', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'A', '-o', './package1.json']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Incorrect file. Access denied to \'./package1.json\'');
        });
    });

    test('test output path isn\'t file', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'A', '-o', './src']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Incorrect file. \'./src\' is not a file');
        });
    });

    test('test incorrect config value', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '--config', 'A-']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Incorrect config value.');
        });
    });

    test('test incorrect config value', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '--config', 'A-R2']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Incorrect config value. R2');
        });
    });

    test('test incorrect config value', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '--config', 'A1']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Incorrect config value. A1');
        });
    });

    test('test incorrect config value', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '--config', 'C']);

        let result = '';

        cp.stderr.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stderr.on('end', () => {
            expect(result).toEqual('Incorrect config value. C');
        });
    });
});