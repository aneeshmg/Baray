const baray = require('./lib/Baray')
const winston = require('winston')

const logger = new baray({
    appName: "test",
    console: false,
    rotateLogs: false,
    json: true,
    path: `${__dirname}/logs`
})

// For comparision purposes 
const loggerW = new(winston.Logger)({
    transports: [
        new(winston.transports.File)({
            name: 'info-file',
            filename: `logs/winston-info.log`,
            level: 'info'
        }),
        new(winston.transports.File)({
            name: 'error-file',
            filename: `logs/winston-error.log`,
            level: 'error'
        }),
        new(winston.transports.File)({
            name: 'warn-file',
            filename: `logs/winston-warning.log`,
            level: 'warning'
        })
    ]
})

const msg = 'test log message'
const msgJson = {
    statusCode: 400,
    data: "something..."
}

// for (let i = 0; i < 1e6; i++) {
//     logger.info(msg + i)
// }
// let i = 0
// setInterval(function () {
//     loggerW.info(msg + ++i)
//     if (i > 1e6) process.exit(0);
// }, 1 / 100000)


// loggerW.log(msg)
// loggerW.info(msg)
// loggerW.warn(msg)
// loggerW.error(msg)


logger.log(msg)
logger.info(msg)
logger.warn(msg)
logger.error(msg)