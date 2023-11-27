// This file will provide different locations to the program according to the operating system

const os = require("os")
const path = require("path")

/**
 * Set of names that represents different platforms
 * **/
const platforms = {
    "Windows": "win32",
    "macOS": "darwin",
    "Linux": "linux"
}

/**
`getInstallBaseLocation` will return the default install location of the program. This location will nevery change even though the user choose another location
for other contents. This location will also help to get other locations according to the anchor file inside.

- Windows - C:\Users\<Username>\LitTools
- macOS - /Users/<Username>/LitTools
- Linux - /home/<Username>/LitTools
**/
function getInstallBaseLocation() {
    return path.join(os.homedir(), "litTools")
}

module.exports = {
    getInstallBaseLocation
}