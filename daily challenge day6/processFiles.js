const readFileAsync = require('./readFileAsync.js');

const  writeFileAsync = require('./writeFileAsync.js');

async function processFiles(filePaths) {
    try {
        
            const filePath = filePaths;
            // console.log(filePath);
            const data = await readFileAsync(filePath);
            // console.log(data);
        const modifiedData = data.toUpperCase();
        // console.log(modifiedData)
        let modifiedDatas = modifiedData.split('').reverse().join('');
        // console.log(modifiedDatas)

       let modifiedDatab = `${new Date().toISOString()}: ${modifiedDatas}`;
        // console.log(modifiedDatab)

            const newFilePath = 'file2.txt';
            await writeFileAsync(newFilePath, modifiedDatab);
             

            // console.log(File processed);
        
    } catch (error) {
        console.error('An error occurred:');
    }
}


module.exports = processFiles;