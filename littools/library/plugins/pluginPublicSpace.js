const configLoader = require("../config/configLoader")

/**
 * All loaded plugins will enter this array after the program runs
 */
let pluginList = []
let pluginFileLocation = path.join(configLoader.readConfigFileSync()["location"], "plugins.json")
let pluginFolderLocation = path.join(configLoader.readConfigFileSync()["location"], "plugins")


module.exports = {
    pluginList,
    pluginFileLocation,
    pluginFolderLocation
}