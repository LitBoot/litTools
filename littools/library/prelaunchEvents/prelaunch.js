const { dialog } = require("electron")
const configLoader = require("../config/configLoader")

function checkConfig() {
    let result = configLoader.checkIsConfigFileExists()
    if (!result.isExists) {
        if (result.missingType === "anchor") {
            let result = dialog.showMessageBoxSync({
                message: "貌似这是您第一次启动LitTools，您希望将插件与配置文件一同放置在默认位置，或您想选择一个其他的位置放置配置与插件文件？",
                type: "warning",
                buttons: ["放在默认位置", "放在其他位置"]
            })
            if (result === 0) {
                // Put in default location
                configLoader.createAnchorFile(configLoader.defaultConfigFileLocation)
                configLoader.createConfigFile(configLoader.defaultConfigFileLocation)
                return true
            }
            else {
                // Ask for a new location
                dialog.showMessageBoxSync({
                    message: "您将会在下一个窗口选择配置文件与插件的存放位置。",
                    type: "info"
                })
                let configFileLocation = dialog.showOpenDialogSync({
                    title: "选择存放配置文件与插件的文件夹",
                    properties: ["openDirectory", "createDirectory", "dontAddToRecent"],
                })
                if (configFileLocation === undefined) {
                    dialog.showMessageBoxSync({
                        message: "您必须选择一个文件夹，重启应用以重新设置",
                        type: "error"
                    })
                    return false
                }
                // Create
                configLoader.createAnchorFile(configFileLocation[0])
                configLoader.createConfigFile(configFileLocation[0])
                return true
            }
        }
        else {
            dialog.showMessageBoxSync({
                message: "LitTools无法读取配置文件，重启软件以重新设置",
                type: "error"
            })
            configLoader.deleteAnchorFile()
            return false
        }
    }
    return true
}

function prelaunchCheck() {
    return checkConfig()
}

module.exports = {
    prelaunchCheck
}