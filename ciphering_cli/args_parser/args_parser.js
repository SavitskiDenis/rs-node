const { accessSync, constants, lstatSync } = require('fs');
const DublicateArgError = require('../errors/dublicate_arg_error');
const MissingArgError = require('../errors/missing_arg_error');
const IncorrectConfigError = require('../errors/incorrect_config_error');
const FileError = require('../errors/file_error');

const parseConfigStr = (value) => {
    if (typeof value !== 'string' || value.length === 0) {
        throw new IncorrectConfigError();
    }

    const items = value.split('-');

    const res = [];
    for (const item of items) {
        if (!/^C[0-1]$|^A$|^R[0-1]$/.test(item)) {
            throw new IncorrectConfigError(item);
        }
        res.push({
            type: item[0],
            encoding: item[1] === '1'
        });
    }

    return res;
}

const checkFile = (path, mode) => {
    if (typeof path !== 'string') {
        return 'Incorrect path';
    }

    try {
        accessSync(path, mode);
    }   catch (err) {
        return err.message;
    }
    
    if (!lstatSync(path).isFile()) {
        return `'${path}' is not a file`;
    }

    return '';
}

const parseArgs = (args) => {
    if (!Array.isArray(args)) {
        throw new Error('Args is not array!');
    }

    const res = {
        transforms: null,
        inputPath: null,
        outputPath: null
    };

    let checkFileRes;
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '-c' || args[i] === '--config') {
            if (res.transforms !== null) {
                throw new DublicateArgError('config');
            }
            res.transforms = parseConfigStr(args[i + 1]);
        }   else if (args[i] === '-i' || args[i] === '--input') {
            if (res.inputPath !== null) {
                throw new DublicateArgError('input');
            }

            checkFileRes = checkFile(args[i + 1], constants.R_OK);
            if (checkFileRes !== '') {
                throw new FileError(checkFileRes);
            }

            res.inputPath =  args[i + 1];
        }    else if (args[i] === '-o' || args[i] === '--output') {
            if (res.outputPath !== null) {
                throw new DublicateArgError('output');
            }

            checkFileRes = checkFile(args[i + 1], constants.W_OK);
            if (checkFileRes !== '') {
                throw new FileError(checkFileRes);
            }

            res.outputPath = args[i + 1];
        }
    }

    if (res.transforms === null) {
        throw new MissingArgError('config');
    }

    return res;
}

module.exports = parseArgs;