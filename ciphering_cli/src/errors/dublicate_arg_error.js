class DublicateArgError extends Error {
    constructor (arg_name) {
        super(`Duplicate ${arg_name} argument`);
        this.name = 'DublicateArgError';
        this.cliError = true;
    }
}

module.exports = DublicateArgError;