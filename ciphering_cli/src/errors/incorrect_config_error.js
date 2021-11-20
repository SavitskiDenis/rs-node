class IncorrectConfigError extends Error {
    constructor (msg) {
        super(`Incorrect config value.${msg ? ' ' + msg : ''}`);
        this.name = 'IncorrectConfigError';
        this.cliError = true;
    }
}

module.exports = IncorrectConfigError;