const fs = require("fs")

const getFilePath = (path, type) => {
    // get latest file of particular type
    let d = new Date()
    return `${path}/${type}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.log`
}

const getFile = (path, type) => {
    return fs.createWriteStream(getFilePath(path, type), {
        "flags": "a"
    })
}

// TODO: add method to read file, required by tests

module.exports = {
    getFile: getFile,
    getFilePath: getFilePath
}