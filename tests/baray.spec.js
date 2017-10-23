const chai = require("chai")
const baray = require("../lib/Baray")
const fs = require("fs")
const types = require("../lib/types")
const utils = require("../lib/utils")

const assert = chai.assert
const expect = chai.expect

describe("Baray tests", () => {

    describe("Default initialization tests", () => {

        let logger = null

        before(() => {
            logger = new baray()
        })
        it("should set default appName", () => {
            expect(logger).to.haveOwnProperty("appName").to.equal("NoName")
        })
        it("should set default 'console'", () => {
            expect(logger).to.haveOwnProperty("console").to.equal(true)
        })
        it("should set default json option", () => {
            expect(logger).to.haveOwnProperty("json").to.equal(true)
        })
        it("should set default log path", () => {
            expect(logger).to.haveOwnProperty("path")
        })
    })

    describe("Initialization via config tests", () => {

        let logger = null
        const appName = "test"
        const _console = false // added the "_" as just 'console' is a reserved word
        const json = true
        const path = `${__dirname}/logs`

        before(() => {
            logger = new baray({
                appName: appName,
                console: _console,
                json: json,
                path: path
            })
        })

        it("should set appName", () => {
            expect(logger).to.haveOwnProperty("appName").to.equal(appName)
        })
        it("should set 'console'", () => {
            expect(logger).to.haveOwnProperty("console").to.equal(_console)
        })
        it("should set json option", () => {
            expect(logger).to.haveOwnProperty("json").to.equal(json)
        })
        it("should set log path", () => {
            expect(logger).to.haveOwnProperty("path").to.equal(path)
        })
    })

    describe("utils & types test cases", () => {
        describe("log types", () => {
            it("should contain 'log' as a type", () => {
                expect(types).to.haveOwnProperty("LOG").to.equal("log")
            })
            it("should contain 'info' as a type", () => {
                expect(types).to.haveOwnProperty("INFO").to.equal("info")
            })
            it("should contain 'warning' as a type", () => {
                expect(types).to.haveOwnProperty("WAR").to.equal("warning")
            })
            it("should contain 'error' as a type", () => {
                expect(types).to.haveOwnProperty("ERR").to.equal("error")
            })
        })
        describe("utils tests", () => {
            describe("getFilePath tests", () => {
                it("should return proper 'info' log file", () => {
                    // TODO
                })
                it("should return proper 'warning' log file", () => {
                    // TODO
                })
                it("should return proper 'error' log file", () => {
                    // TODO
                })
            })
            describe("getFile tests", () => {
                it("should return write stream of info file", () => {
                    // TODO
                })
                it("should return write stream of warning file", () => {
                    // TODO
                })
                it("should return write stream of error file", () => {
                    // TODO
                })
            })
        })
    })

    describe("should generate approriate log entry logging to console and file in json", () => {
        let logger = null
        const message = "some text message"
        const path = `${__dirname}/logs`
        let _console = null
        let infoFile = null
        let warnFile = null
        let errorFile = null

        before(() => {
            logger = new baray({
                appName: "test",
                console: true,
                json: true,
                path: path
            })
            _console.stdout = process.stdout
            _console.stderr = process.stderr
            // TODO: pending initializations & assertions
        })

        it("should generate proper console log object", () => {
            logger.log(message)
        })
        it("should generate proper info log object", () => {
            logger.info(message)
        })
        it("should generate proper warning log object", () => {
            logger.warn(message)
        })
        it("should generate proper error log object", () => {
            logger.error(message)
        })
    })

    describe("should log to approriate log file in regular form (not json)", () => {
        let logger = null
        const message = "some text message"
        const path = `${__dirname}/logs`

        before(() => {
            logger = new baray({
                appName: "test",
                cosole: false,
                json: false,
                path: path
            })
        })
    })
})