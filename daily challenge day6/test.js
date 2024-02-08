const { read } = require("fs")

const fs = require("fs").promises

async function readfile(path) {
    try {
        const data = await fs.readFile(path,"utf-8")
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
// readfile("./test.txt")
async function writefile(path,content) {
    try {
        const data = await fs.writeFile(path,content,"utf-8")
    } catch (error) {
        console.log(error)
    }
}
// writefile("./file3.txt", "helo hello")

async function processfile(path) {
    try
    {
        let content = await readfile(path)
    content = content.toUpperCase().split('').reverse().join('')
    content = `${new Date().toISOString()}  - ${content}`
    const newFilePath = `.${path.split(".")[1]}_new.txt`;
    await writefile(`./${newFilePath}`, content);
    } catch (error) {
        console.log(error)
    }
    
} 

processfile("./file3.txt")