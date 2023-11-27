const fs = require("fs")

/**
 * Read a JSON file and return with struct
 * This function is sync
 */
function readJSONFile(loc) {
    let rawContent = fs.readFileSync(loc)
    return JSON.parse(rawContent)
}

/**
 * Write a struct into a JSON file
 * This function is sync
 */
function writeJSONFile(loc, content) {
    let wcontent = JSON.stringify(content)
    fs.writeFileSync(loc, wcontent)
}

module.exports = {
    readJSONFile,
    writeJSONFile
}