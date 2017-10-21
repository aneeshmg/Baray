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
})