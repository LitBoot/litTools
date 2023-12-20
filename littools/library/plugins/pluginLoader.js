const locService = require("../locations/locations")
const configLoader = require("../config/configLoader")
const fs = require("fs")
const fse = require("../fs/fsExtends")
const path = require("path")
const public = require("./pluginPublicSpace")

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
    fse.writeJSONFile(pluginFileLocation, public.pluginList)
}

/**
 * Load the plugin list from the filesystem
 * 
 * This will forcely override the data in the memory. Please be careful while using this function
 */
function loadPluginsFile() {
    public.pluginList = fse.readJSONFile(pluginFileLocation)                                                                 
}

/**
 * Validate a plugin 
 * Include validation process.
 * @param {string} pluginUUID The UUID of the plugin
 * @returns {object} IsValid {"isValid": `boolean`, "msg": `""`}
 */
function validatePlugin(pluginUUID) {
    // Find whether the plugin folder named with the plugin UUID exists
    if (!fs.existsSync(path.join(pluginFolderLocation, pluginUUID))) {
        return {"isValid": false, "msg": "Unable to read plugin directory. Dir not exists!"}
    }
    // Check and validate the mamifest.json file
    if (!fs.existsSync(path.join(pluginFolderLocation, pluginUUID, "manifest.json"))) {
        console.log(path.join(pluginFolderLocation, pluginUUID, "mainfest.json"))
        return { "isValid": false, "msg": "Unable to read plugin manifest data. File does not exists" }
    }
    // Check whether the uuid was valid
    let uuid = fse.readJSONFile(path.join(pluginFolderLocation, pluginUUID, "manifest.json"))["id"]
    if (uuid !== pluginUUID) {
        return { "isValid": false, "msg": "Unable to load plugin. Invalid UUID Validation" }
    }
    // Success
    return { "isValid": true, "msg": "Success" }
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

    // Load every plugin and check the plugins
    public.pluginList = fse.readJSONFile(pluginFileLocation)
    // Iterate through and validate plugins
    console.log("Plugin Initialization Process Start...")
    let passCounter = 0, failedCounter = 0
    for (let i = 0; i < public.pluginList.length; i++) {
        let result = validatePlugin(public.pluginList[i]["id"])
        if (result["isValid"]) {
            console.log("Plugin: " + public.pluginList[i]["name"] + " has been initialized!")
            passCounter += 1;
        }
        else {
            // Disable this plugin
            public.pluginList[i]["enabled"] = false
            console.log("Plugin: " + public.pluginList[i]["name"] + " cannot be initialized and disabled. Reason: " + result["msg"])
            failedCounter += 1;
        }
    }
    // Print the summary and save to files
    console.log("Plugin Initialization finished! Success: " + passCounter + " , Failed: " + failedCounter + " , Total: " + public.pluginList.length)
    updatePluginsFile()
    
}

/**
 * Re-initialize all plugins and update to files
 */
function revalidatePlugins() {
    // Iterate through and validate plugins
    console.log("Plugin Initialization Process Start...")
    let passCounter = 0, failedCounter = 0
    for (let i = 0; i < public.pluginList.length; i++) {
        let result = validatePlugin(public.pluginList[i]["id"])
        if (result["isValid"]) {
            console.log("Plugin: " + public.pluginList[i]["name"] + " has been initialized!")
            passCounter += 1;
        }
        else {
            // Disable this plugin
            public.pluginList[i]["enabled"] = false
            console.log("Plugin: " + public.pluginList[i]["name"] + " cannot be initialized and disabled. Reason: " + result["msg"])
            failedCounter += 1;
        }
    }
    // Print the summary and save to files
    console.log("Plugin Initialization finished! Success: " + passCounter + " , Failed: " + failedCounter + " , Total: " + public.pluginList.length)
    updatePluginsFile()
}

module.exports = {
    prelaunch,
    revalidatePlugins
}