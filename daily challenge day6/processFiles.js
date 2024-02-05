const readFileAsync = require('./readFileAsync.js');

const  writeFileAsync = require('./writeFileAsync.js');

async function processFiles(filePaths) {
    try {
        
        const filePath = filePaths;
            console.log(filePath);
        const data = await readFileAsync(filePath);
            // console.log(data);
        let modifiedData = data.toUpperCase();
        // console.log(modifiedData)
         modifiedData = modifiedData.split('').reverse().join('');
        // console.log(modifiedDatas)

        modifiedData = `${new Date().toISOString()}: ${modifiedData}`;
        // console.log(modifiedDatab)

        const newFilePath = `.${filePath.split(".")[1]}_new.txt`;
        console.log(newFilePath)
        await writeFileAsync(newFilePath, modifiedData);
        
             

            // console.log(File processed);
        
    } catch (error) {
        console.error('An error occurred:' + error);
    }
}


module.exports = processFiles;