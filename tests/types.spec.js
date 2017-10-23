const chai = require("chai")
const expect = chai.expect

const types = require("../lib/types")

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