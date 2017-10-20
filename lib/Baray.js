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
    }
    info(message) {
        const logEntry = new LogModel(this.appName, message, types.INFO)
        this.print(types.INFO, logEntry)
    }
    error(message) {
        const logEntry = new LogModel(this.appName, message, types.ERR)
        this.print(types.ERR, logEntry)
    }
    print(type, content) {
        // put condition to rotate log based on date here
        switch (type) {
            case types.INFO:
                this.BarayConsole.log(JSON.stringify(content))
                if (this.console)
                    console.log(JSON.stringify(content))
                break
            case types.ERR:
                this.BarayConsole.log(JSON.stringify(content))
                if (this.console)
                    console.log(JSON.stringify(content))
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
    INFO: "info",
    ERR: "warning"
}

module.exports = Baray