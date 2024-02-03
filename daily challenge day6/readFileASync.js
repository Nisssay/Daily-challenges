const fs = require('fs');
;
function readFileAsync(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                reject("File not found");
            } else {
                resolve(data);
            }
        });
    });
}
module.exports = readFileAsync;