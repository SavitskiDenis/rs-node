const { pipeline } = require('stream');
const { AtbashTransform, CaesarTransform, Rot8 } = require('./transforms');
const CipheringReadStream = require('./readable/ciphering_read_stream');
const CipheringWriteStream = require('./writable/ciphering_write_stream');
const parseArgs = require('./args_parser/args_parser');

const generateStreamsArrayByConfig = (config) => {
    const streams = [ new CipheringReadStream(config.inputPath) ];
    
    config.transforms.forEach(el => {
        if (el.type === 'C') {
            streams.push(new CaesarTransform(el.encoding));
        }   else if (el.type === 'A') {
            streams.push(new AtbashTransform());
        }   else if (el.type === 'R') {
            streams.push(new Rot8(el.encoding));
        }
    });
    
    streams.push(new CipheringWriteStream(config.outputPath));

    return streams;
}

const cipheringProcess = () => {
    try {
        const config = parseArgs(process.argv);

        const streams = generateStreamsArrayByConfig(config);
        
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