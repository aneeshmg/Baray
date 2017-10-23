const chai = require("chai")
const baray = require("../lib/Baray")
const fs = require("fs")
const types = require("../lib/types")
const utils = require("../lib/utils")

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

    describe("should generate approriate log entry logging to console and file in json", () => {
        let logger = null
        const message = "some text message"
        const path = `${__dirname}/logs`
        let infoFileContent = null
        let warnFileContent = null
        let errorFileContent = null

        before(() => {
            logger = new baray({
                appName: "test",
                console: false,
                json: true,
                path: path
            })
            utils._dirCleanup(path)

            logger.info(message)
            logger.warn(message)
            logger.error(message)
        })

        it("should generate proper info log object", () => {
            infoFileContent = JSON.parse(utils._getFileContents(path, types.INFO))
            expect(infoFileContent).to.not.be.equal(undefined || null)
            expect(infoFileContent.message).to.equal(message)
            expect(infoFileContent).to.haveOwnProperty("timestamp")
            expect(infoFileContent).to.haveOwnProperty("appName").to.equal("test")
            expect(infoFileContent).to.haveOwnProperty("type").to.equal(types.INFO)
        })
        it("should generate proper warning log object", () => {
            warnFileContent = JSON.parse(utils._getFileContents(path, types.WAR))
            expect(warnFileContent).to.not.be.equal(undefined || message)
            expect(warnFileContent.message).to.equal(message)
            expect(warnFileContent).to.haveOwnProperty("timestamp")
            expect(warnFileContent).to.haveOwnProperty("appName").to.equal("test")
            expect(warnFileContent).to.haveOwnProperty("type").to.equal(types.WAR)
        })
        it("should generate proper error log object", () => {
            errorFileContent = utils._getFileContents(path, types.ERR)
            expect(errorFileContent).to.include("Error")
            expect(errorFileContent).to.include(message)
            expect(errorFileContent).to.include(types.ERR)
            expect(errorFileContent).to.include("timestamp")
            expect(errorFileContent).to.include("appName")
        })

        after(() => {
            utils._dirCleanup(path)
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