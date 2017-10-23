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
const _getFileContents = (path, type) => {
    return fs.readFileSync(getFilePath(path, type), "utf8")
}

const _dirCleanup = path => {
    let logFiles = fs.readdirSync(path)
    if (logFiles.length > 0) {
        for (logFile of logFiles) {
            if (fs.statSync(`${path}/${logFile}`).isFile())
                fs.unlinkSync(`${path}/${logFile}`)
        }
    }
}

module.exports = {
    getFile: getFile,
    getFilePath: getFilePath,
    _getFileContents: _getFileContents,
    _dirCleanup: _dirCleanup
}