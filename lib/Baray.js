const fs = require('fs')

class Baray {
    constructor(options) {
        this.appName = options.appName || "NoName"
        this.console = options.console && true
        this.rotateLogs = options.rotateLogs ? options.rotateLogs : false
        this.json = options.json && true
        this.path = options.path || `${__dirname}/../logs`
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path);
        }
        this.BarayConsole = new console.Console(this.getFile(types.INFO), this.getFile(types.ERR))
        this.BarayWarningConsole = new console.Console(this.getFile(types.WAR), this.getFile(types.ERR))
    }
    log(message) {
        const logEntry = new LogModel(this.appName, message, types.LOG)
        this.print(types.LOG, logEntry)
    }
    info(message) {
        const logEntry = new LogModel(this.appName, message, types.INFO)
        this.print(types.INFO, logEntry)
    }
    warn(message) {
        const logEntry = new LogModel(this.appName, message, types.WAR)
        this.print(types.WAR, logEntry)
    }
    error(message) {
        const logEntry = new LogModel(this.appName, message, types.ERR)
        this.print(types.ERR, logEntry)
    }
    print(type, content) {
        // put condition to rotate log based on date here
        switch (type) {
            case types.LOG:
                console.log(JSON.stringify(content))
                break
            case types.INFO:
                this.BarayConsole.info(JSON.stringify(content))
                if (this.console)
                    console.log(JSON.stringify(content))
                break
            case types.WAR:
                this.BarayWarningConsole.info(JSON.stringify(content))
                if (this.console)
                    console.log(JSON.stringify(content))
                break
            case types.ERR:
                this.BarayConsole.error(new Error(JSON.stringify(content)))
                if (this.console)
                    console.error(new Error(JSON.stringify(content)))
                break
            default:
                console.log(JSON.stringify(content))
        }
    }
    getFile(type) {
        return fs.createWriteStream(this.getFilePath(type), {
            'flags': 'a'
        })
    }
    getFilePath(type) {
        return `${this.path}/${type}.log`
    }
}

class LogModel {
    constructor(appName, message, type) {
        this.appName = appName
        this.type = type
        this.timestamp = new Date()
        this.message = message
    }
}
const types = {
    LOG: "log",
    INFO: "info",
    ERR: "error",
    WAR: "warning"
}

module.exports = Baray