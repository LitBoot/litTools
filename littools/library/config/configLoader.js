const fs = require("fs")
const fse = require("../fs/fsExtends")
const path = require("path")
const locationsService = require("../locations/locations")

// The template of the config file
let configContentTemplate = {
    "version": "1.0.0",
    "user": {
        "id": "",
        "rememberMe": true,
        "rememberPassword": false
    },
    "keyBinding": {
        "triggerMainWindow": "",
        "triggerSettings": ""
    }
}

// The template of the anchor file
let anchorFileTemplate = {
    "config": ""
}

const defaultConfigFileLocation = locationsService.getInstallBaseLocation()

/**
 * Check whether the config files exists.
 * 
 * This function will take 2 steps:
 * 1. Check whether the anchor file exists
 * 2. Check whether the config file indicated in the anchor file exists
 * 
 * The function will return a structure like: `{isExists: boolean, missingType: string(anchor/config)}`.
**/
function checkIsConfigFileExists() {
    // Check anchor files first
    if (!fs.existsSync(path.join(locationsService.getInstallBaseLocation(), "anchor.json"))) {
        return { "isExists": false, "missingType": "anchor" }
    }
    // Get the config location from the file
    let anchorFileContent = fse.readJSONFile(path.join(locationsService.getInstallBaseLocation(), "anchor.json"))
    // Check whether the config file is exists
    if (!fs.existsSync(path.join(anchorFileContent["config"], "config.json"))) {
        return { "isExists": false, "missingType": "config" }
    }
    return { "isExists": true, "missingType": "" }
}

/**
 * Create the anchor file for the userm. The location only includes folder name.
 * 
 * Parameters:
 * @param {string} configFileLoc 
 */
function createAnchorFile(configFileLoc) {
    let content = anchorFileTemplate
    content.config = path.join(configFileLoc)
    // Create the folder first
    if (!fs.existsSync(locationsService.getInstallBaseLocation())) {
        fs.mkdirSync(locationsService.getInstallBaseLocation())
    }
    fse.writeJSONFile(path.join(locationsService.getInstallBaseLocation(), "anchor.json"), content)
}

/**
 * Create the config file with template content. The location only includes folder name.
 * @param {string} configFileLoc 
 */
function createConfigFile(configFileLoc) {
    if (!fs.existsSync(configFileLoc)) {
        fs.mkdirSync(configFileLoc)
    }
    if (!fs.existsSync(path.join(configFileLoc, "config.json"))) {
        fse.writeJSONFile(path.join(configFileLoc, "config.json"), configContentTemplate)
    }
    else {
        console.log("Passed creation of config file because config file has been created!")
    }
}

/**
 * Delete the current existed anchor file to reset
 */
function deleteAnchorFile() {
    fs.rmSync(path.join(defaultConfigFileLocation, "anchor.json"))
}

/**
 * Return the location and the content of the config file. Return undefined if cannot find the file.
 * @returns {object} location{string}, content{string}
 */
function readConfigFileSync() {
    try {
        // Try to open the anchor file first
        let anchorFileContent = fse.readJSONFile(path.join(defaultConfigFileLocation, "anchor.json"))
        // Try to read the config file content
        let configFileContent = fse.readJSONFile(path.join(anchorFileContent["config"], "config.json"))
        return {"location": anchorFileContent["config"], "content": configFileContent}
    } catch (error) {
        return { "location": undefined, "content": undefined }
    }
}

module.exports = {
    defaultConfigFileLocation,
    checkIsConfigFileExists,
    createAnchorFile,
    createConfigFile,
    deleteAnchorFile,
    readConfigFileSync
}