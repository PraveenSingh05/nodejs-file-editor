const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'read':
        readFile(args[1]);
        break;
    case 'delete':
        deleteFile(args[1]);
        break;
    case 'create':
        createFile(args[1]);
        break;
    case 'append':
        appendFile(args[2], args[1]);
        break;
    case 'rename':
        renameFile(args[1], args[2]);
        break;
    case 'list':
        listDirectory(args[1]);
        break;
    default:
        console.log('Invalid command. Please use read, delete, create, append, rename, or list.');
}

function readFile(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`);
            return;
        }
        console.log(`Contents of ${fileName}:\n${data}`);
    });
}

function deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return;
        }
        console.log(`File '${fileName}' deleted`);
    });
}

function createFile(fileName) {
    fs.writeFile(fileName, '', (err) => {
        if (err) {
            console.error(`Error creating file: ${err.message}`);
            return;
        }
        console.log(`File '${fileName}' created`);
    });
}

function appendFile(fileName, content) {
    fs.appendFile(fileName, `\n${content}`, (err) => {
        if (err) {
            console.error(`Error appending to file: ${err.message}`);
            return;
        }
        console.log(`Content appended to the file '${fileName}'`);
    });
}

function renameFile(oldName, newName) {
    fs.rename(oldName, newName, (err) => {
        if (err) {
            console.error(`Error renaming file: ${err.message}`);
            return;
        }
        console.log(`File '${oldName}' renamed to '${newName}'`);
    });
}

function listDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error(`Error listing directory: ${err.message}`);
            return;
        }
        console.log(`Contents of directory '${dirPath}':`);
        files.forEach(file => {
            console.log(file);
        });
    });
}
