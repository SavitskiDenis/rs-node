class FileError extends Error {
    constructor (msg = '') {
        super(`Incorrect file.${msg !== '' ? ` ${msg}` : ''}`);
        this.name = 'FileError';
        this.cliError = true;
    }
}

module.exports = FileError;