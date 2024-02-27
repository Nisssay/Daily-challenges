const fs = require('fs');

function readDataFromFile(path) {
    let data;
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, rawdata) => {
            if (err) {
                console.error("Error reading file:", err);
                reject(err);
            } else {
                try {
                    data = JSON.parse(rawdata);
                    resolve(data);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    reject(error);
                }
            }
        });
    });
}

function writefile(path , content, dataFromController , message){
    return new Promise((resolve,reject) =>{
        fs.writeFile(path , content , (err) =>{
            if(err){
                console.log("Error writing file : " ,err);
                reject(err);
            }
            else{ 
                console.log("blog with the Id :" , dataFromController , "was " , message ," successfully");
                resolve(true);
            }
        });
    })
    
}

module.exports = {
    readDataFromFile,
    writefile
}