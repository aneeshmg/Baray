const fs = require("fs")
const types = require("./types")
const utils = require("./utils")

class Baray {
    constructor(options = {}) {
        this.appName = options.appName || "NoName"
        if (options.console == undefined) this.console = true // set default
        else this.console = options.console
        if (options.json == undefined) this.json = true // set default
        else this.json = options.json
        this.path = options.path || `${__dirname}/../logs`
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path)
        }
    }
    log(message) {
        const logEntry = new LogEntry(this.appName, message, types.LOG)
        print(this.path, types.LOG, logEntry)
        if (this.console)
            console.log(JSON.stringify(logEntry))
    }
    info(message) {
        const logEntry = new LogEntry(this.appName, message, types.INFO)
        if (this.json)
            print(this.path, types.INFO, JSON.stringify(logEntry))
        else
            print(this.path, types.INFO, logEntry)
        if (this.console)
            console.log(JSON.stringify(logEntry))
    }
    warn(message) {
        const logEntry = new LogEntry(this.appName, message, types.WAR)
        if (this.json)
            print(this.path, types.WAR, JSON.stringify(logEntry))
        else
            print(this.path, types.WAR, logEntry)
        if (this.console)
            console.log(JSON.stringify(logEntry))
    }
    error(message) {
        const logEntry = new LogEntry(this.appName, message, types.ERR)
        if (this.json)
            print(this.path, types.ERR, JSON.stringify(logEntry))
        else
            print(this.path, types.ERR, logEntry)
        if (this.console)
            console.log(JSON.stringify(logEntry))
    }
}

let print = (path, type, content) => {

    let _console = new console.Console(utils.getFile(path, types.INFO), utils.getFile(path, types.ERR))
    let _warningConsole = new console.Console(utils.getFile(path, types.WAR), utils.getFile(path, types.ERR))

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