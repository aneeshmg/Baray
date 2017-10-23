const chai = require("chai")
const expect = chai.expect
const types = require("../lib/types")
const utils = require("../lib/utils")
const path = `${__dirname}/logs`

describe("utils tests", () => {
    let infoFile, warningFile, errorFile
    before(() => {
        let d = new Date()
        infoFile = `${path}/info-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.log`
        warningFile = `${path}/warning-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.log`
        errorFile = `${path}/error-${d.getDate()}-${d.getMonth()}-${d.getFullYear()}.log`
    })
    describe("getFilePath tests", () => {
        
        it("should return proper 'info' log file", () => {
            expect(utils.getFilePath(path, types.INFO)).to.equal(infoFile)
        })
        it("should return proper 'warning' log file", () => {
            expect(utils.getFilePath(path, types.WAR)).to.equal(warningFile)
        })
        it("should return proper 'error' log file", () => {
            expect(utils.getFilePath(path, types.ERR)).to.equal(errorFile)
        })
    })
    describe("getFile tests", () => {
        let fileStream = null
        
        it("should return write stream of info file", () => {
            fileStream = utils.getFile(path, types.INFO)
            expect(fileStream).to.be.an("Object")
            expect(fileStream).to.have.a.property("path").to.equal(infoFile)
            expect(fileStream).to.have.a.property("writable").to.equal(true)
            expect(fileStream).to.have.a.property("flags").to.equal("a")
        })
        it("should return write stream of warning file", () => {
            fileStream = utils.getFile(path, types.WAR)
            expect(fileStream).to.be.an("Object")
            expect(fileStream).to.have.a.property("path").to.equal(warningFile)
            expect(fileStream).to.have.a.property("writable").to.equal(true)
            expect(fileStream).to.have.a.property("flags").to.equal("a")
        })
        it("should return write stream of error file", () => {
            fileStream = utils.getFile(path, types.ERR)
            expect(fileStream).to.be.an("Object")
            expect(fileStream).to.have.a.property("path").to.equal(errorFile)
            expect(fileStream).to.have.a.property("writable").to.equal(true)
            expect(fileStream).to.have.a.property("flags").to.equal("a")
        })
    })
    // TODO: add test cases for _getFileContents & _dirCleanup
})