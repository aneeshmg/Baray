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

const colors = {
    reset: '\033[0m',

    //text color
    black: '\033[30m',
    red: '\033[31m',
    green: '\033[32m',
    yellow: '\033[33m',
    blue: '\033[34m',
    magenta: '\033[35m',
    cyan: '\033[36m',
    white: '\033[37m',

    //background color
    blackBg: '\033[40m',
    redBg: '\033[41m',
    greenBg: '\033[42m',
    yellowBg: '\033[43m',
    blueBg: '\033[44m',
    magentaBg: '\033[45m',
    cyanBg: '\033[46m',
    whiteBg: '\033[47m'
}

module.exports = {
    getFile: getFile,
    getFilePath: getFilePath,
    _getFileContents: _getFileContents,
    _dirCleanup: _dirCleanup,
    Colors: colors
}