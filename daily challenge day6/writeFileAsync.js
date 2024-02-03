const fs = require('fs');

function writeFileAsync(filepath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, content, 'utf8', (err) => {
            if (err) {
                reject("Error writing to file");
            } else {
                resolve('File write successful');
            }
        });
    });
}

module.exports = writeFileAsync;