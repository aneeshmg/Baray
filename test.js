const baray = require('./lib/Baray')
const winston = require('winston')

const logger = new baray({
    appName: "test",
    console: true,
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
        })
    ]
})

const msg = 'test log message'
const msgJson = {
    statusCode: 400,
    data: "something..."
}

// for (let i = 0; i < 1e6; i++)
//     logger.info(msg)

loggerW.info(msg)
loggerW.error(msg)

logger.info(msg)
logger.error(msg)