const { expect, describe } = require('@jest/globals');
const { spawn } = require('child_process');

describe('cli success scenarios', () => {

    test('test execute -c \'C1-C1-R0-A\'', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'C1-C1-R0-A', '-i', './test/cli/input.txt']);

        let result = '';

        cp.stdout.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stdout.on('end', () => {
            expect(result).toEqual('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
        });
    });

    test('test execute -c \'C1-C0-A-R1-R0-A-R0-R0-C1-A\'', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A', '-i', './test/cli/input.txt']);

        let result = '';

        cp.stdout.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stdout.on('end', () => {
            expect(result).toEqual('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!');
        });
    });

    test('test execute -c \'A-A-A-R1-R0-R0-R0-C1-C1-A\'', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A', '-i', './test/cli/input.txt']);

        let result = '';

        cp.stdout.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stdout.on('end', () => {
            expect(result).toEqual('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!');
        });
    });

    test('test execute -c \'C1-R1-C0-C0-A-R0-R1-R1-A-C1\'', () => {
        const cp = spawn('node', ['./ciphering_cli.js', '-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './test/cli/input.txt']);

        let result = '';

        cp.stdout.on('data', chunk => {
            result += chunk.toString();
        });

        cp.stdout.on('end', () => {
            expect(result).toEqual('This is secret. Message about "_" symbol!');
        });
    });
});