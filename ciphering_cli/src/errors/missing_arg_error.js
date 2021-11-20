class MissingArgError extends Error {
    constructor (arg_name) {
        super(`Missing ${arg_name} argument`);
        this.name = 'MissingArgError';
        this.cliError = true;
    }
}

module.exports = MissingArgError;