const { pipeline } = require('stream');
const parseArgs = require('./src/args_parser/args_parser');
const getStreamsArrayByConfig = require('./src/utils/getStreamsArrayByConfig');

const cipheringProcess = () => {
    try {
        const config = parseArgs(process.argv);

        const streams = getStreamsArrayByConfig(config);
        
        pipeline(
            streams,
            (err) => {
                if (err) {
                    throw err;
                }
            }
        );
    }   catch (err) {
        if (err.cliError) {
            process.stderr.write(err.message);
            process.exit(-1);
        }   else {
            throw err;
        }
    }
}

cipheringProcess();