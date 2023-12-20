const {dialog} = require("electron")
const compressing = require("compressing")
const publicSpace = require("./pluginPublicSpace")
const loader = require("./pluginLoader")
const path = require("path")
const fse = require("../fs/fsExtends")
const fs = require("fs")


/**
 * Install a plugin to the program
 * @param {String} pluginLoc Location of plugin file. Ask user in dialog if set to null
 * @returns {Boolean} Whether the operation is success
 */
async function installPlugin(pluginLoc=null) {
    try {
        // ask user for plugin location
        if (pluginLoc === null) {
            pluginLoc = dialog.showOpenDialogSync({
                "title": "选择插件位置",
                "properties": ["openFile"],
                "filters": [
                    { "name": "LitTools Plugin File", "extensions": "ltpg" }
                ]
            })[0]
        }

        // unzip the plugin to the plugin folder
        await compressing.zip.uncompress(pluginLoc, path.join(publicSpace.pluginFolderLocation, "tempPluginFolder"))

        // get the uuid from the folder
        let pluginInfo = fse.readJSONFile(path.join(publicSpace.pluginFolderLocation, "tempPluginFolder", "manifest.json"))
        let pluginUUID = pluginInfo["id"]

        // rename
        fs.renameSync(path.join(publicSpace.pluginFolderLocation, "tempPluginFolder"), path.join(publicSpace.pluginFolderLocation, pluginUUID))

        // append current plugin into the list and refresh the loader
        publicSpace.pluginList.push({
            "name": pluginInfo["name"],
            "id": pluginUUID,
            "version": pluginInfo["version"],
            "enabled": true
        })
        loader.revalidatePlugins()
        return true
    } catch (error) {
        return false
    }

}