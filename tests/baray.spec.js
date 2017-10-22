const chai = require("chai")
const baray = require("../lib/Baray")

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
})