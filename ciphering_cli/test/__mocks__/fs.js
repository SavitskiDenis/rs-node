const fs = jest.createMockFromModule('fs');

let files = [];
function __setFiles(arr) {
    files = arr;
}

function readFileSync (path) {
    const file = files.find(el => el.path === path)
    if (!file) {
        throw new Error(`No such file '${path}'`);
    }

    return Buffer.from(file.content);
}

function writeFileSync (path, chunk) {
    // console.log('write ', chunk, ` to ${path}`);
}

function accessSync (path, mode) {
    const file = files.find(el => el.path === path)
    if (!file) {
        throw new Error(`No such file '${path}'`);
    }
}

function lstatSync (path) {
    const file = files.find(el => el.path === path)
    if (file) {
        return { isFile: () => file.isFile }
    }
    return { isFile: () => false }
}

fs.__setFiles = __setFiles;
fs.readFileSync = jest.fn(readFileSync);
fs.writeFileSync = jest.fn(writeFileSync);
fs.accessSync = jest.fn(accessSync);
fs.lstatSync = jest.fn(lstatSync);

module.exports = fs;