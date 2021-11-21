const { AtbashTransform, CaesarTransform, Rot8Transform } = require('../transforms');
const CipheringReadStream = require('../readable/ciphering_read_stream');
const CipheringWriteStream = require('../writable/ciphering_write_stream');

const getStreamsArrayByConfig = (config) => {
    const streams = [ config.inputPath ? new CipheringReadStream(config.inputPath) : process.stdin ];
    
    config.transforms.forEach(el => {
        if (el.type === 'C') {
            streams.push(new CaesarTransform(el.encoding));
        }   else if (el.type === 'A') {
            streams.push(new AtbashTransform());
        }   else if (el.type === 'R') {
            streams.push(new Rot8Transform(el.encoding));
        }
    });
    
    streams.push(config.outputPath ? new CipheringWriteStream(config.outputPath) : process.stdout);

    return streams;
}

module.exports = getStreamsArrayByConfig;