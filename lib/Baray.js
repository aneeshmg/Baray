const fs = require('fs')

const types = {
    LOG: "log",
    INFO: "info",
    ERR: "error",
    WAR: "warning"
}

class Baray {
    constructor(options) {
        this.appName = options.appName || "NoName"
        this.console = options.console && true
        this.json = options.json && true
        this.path = options.path || `${__dirname}/../logs`
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path);
        }
    }
    log(message) {
        const logEntry = new LogEntry(this.appName, message, types.LOG)
        print(this.path, types.LOG, logEntry)
        if (this.console)
            console.log(JSON.stringify(content))
    }
    info(message) {
        const logEntry = new LogEntry(this.appName, message, types.INFO)
        if (this.json)
            print(this.path, types.INFO, JSON.stringify(logEntry))
        else
            print(this.path, types.INFO, logEntry)
        if (this.console)
            console.log(JSON.stringify(content))
    }
    warn(message) {
        const logEntry = new LogEntry(this.appName, message, types.WAR)
        if (this.json)
            print(this.path, types.WAR, JSON.stringify(logEntry))
        else
            print(this.path, types.WAR, logEntry)
        if (this.console)
            console.log(JSON.stringify(content))
    }
    error(message) {
        const logEntry = new LogEntry(this.appName, message, types.ERR)
        if (this.json)
            print(this.path, types.ERR, JSON.stringify(logEntry))
        else
            print(this.path, types.ERR, logEntry)
        if (this.console)
            console.log(JSON.stringify(content))
    }
}

const getFilePath = (path, type) => {
    // get latest file of particular type
    let d = new Date()
    return `${path}/${type}-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.log`
}

const getFile = (path, type) => {
    return fs.createWriteStream(getFilePath(path, type), {
        'flags': 'a'
    })
}

let print = (path, type, content) => {

    let _console = new console.Console(getFile(path, types.INFO), getFile(path, types.ERR))
    let _warningConsole = new console.Console(getFile(path, types.WAR), getFile(path, types.ERR))

    switch (type) {
        case types.LOG:
            console.log(JSON.stringify(content))
            break
        case types.INFO:
            _console.info(content)
            break
        case types.WAR:
            _warningConsole.info(content)
            break
        case types.ERR:
            _console.error(new Error(content))
            break
        default:
            console.log(JSON.stringify(content))
    }
}

class LogEntry {
    constructor(appName, message, type) {
        this.appName = appName
        this.type = type
        this.timestamp = new Date()
        this.message = message
    }
}

module.exports = Baray