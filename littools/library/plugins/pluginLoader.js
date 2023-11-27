const locService = require("../locations/locations")
const configLoader = require("../config/configLoader")
const fs = require("fs")
const fse = require("../fs/fsExtends")
const path = require("path")

/**
 * All loaded plugins will enter this array after the program runs
 */
let pluginList = []

let pluginInfoTemplate = {
    "name": "",
    "id": "",
    "version": "",
    "enabled": true
}

/**
 * The plugin file and folder location
 */
let pluginFileLocation = path.join(configLoader.readConfigFileSync()["location"], "plugins.json")
let pluginFolderLocation = path.join(configLoader.readConfigFileSync()["location"], "plugins")

/**
 * Return whether the plugin file exists
 * @returns {boolean}isExists 
 */
function checkIsPluginFileExists() {
    return fs.existsSync(pluginFileLocation)
}

/**
 * Return whether the plugin folder exists
 * @returns {boolean}isExists 
 */
function checkIsPluginFolderExists() {
    return fs.existsSync(pluginFolderLocation)
}

/**
 * Create the plugin file if plugins.json does not exists under the config folder
 */
function createPluginFile() {
    if (!checkIsPluginFileExists()) {
        fse.writeJSONFile(pluginFileLocation, [])
    }
}

/**
 * Create the plugin folder if plugins.json does not exists under the config folder
 */
function createPluginFolder() {
    if (!checkIsPluginFolderExists()) {
        fs.mkdirSync(pluginFolderLocation)
    }
}

/**
 * This function will update the information from memory to disk.
 * 
 * System will *always* update the data in the memory first, and then write it into the disk
 */
function updatePluginsFile() {
    fse.writeJSONFile(pluginFileLocation, pluginList)
}

/**
 * Load the plugin list from the filesystem
 * 
 * This will forcely override the data in the memory. Please be careful while using this function
 */
function loadPluginsFile() {
    pluginList = fse.readJSONFile(pluginFileLocation)                                                                 
}

/**
 * Prelaunch function will exectued to initialize the application in order to make app run proerply.
 * Prelaunch function here will execute the following:
 * - Create files and folders if not exists
 * - Load all plugin information and check activation status
 */
function prelaunch() {
    // Create process
    createPluginFile()
    createPluginFolder()

    // plugin loader

}