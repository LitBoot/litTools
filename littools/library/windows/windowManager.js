const {BrowserWindow} = require("electron")

/**
 * The main list of all windows except main, about, and settings
 * @type {Array<{id: String, window: BrowserWindow}>}
 */
let windowsList = []

/**
 * Create a new instance of BrowerWindow and display it on screen
 * @param {Electron.BrowserWindowConstructorOptions} browserWindowProperties The proerties of the browerWindow
 * @param {String} htmlLocation The absolute path to the target html page
 * @param {String} pageID ID of the page
 */
const createNewWindow = (browserWindowProperties, htmlLocation, pageID) => {
    // append to the array
    let length = windowsList.push({
        "id": pageID,
        "window": new BrowserWindow(browserWindowProperties)
    })
    // load target file and show
    windowsList[length-1].window.loadFile(htmlLocation)

    windowsList[length - 1].window.on("close", ()=>{
        wipeOutWindow(pageID)
    })
}

/**
 * Close the target page
 * @param {String} pageID The ID of the window
 * @returns {Boolean} Whether process is success
 */
const closeWindow = (pageID) => {
    let result = false
    for (let i = 0; i < windowsList.length; i++) {
        if (windowsList[i].id === result) {
            // close the window
            windowsList[i].window.close()
            // delete from the array
            windowsList.splice(i, 1)
            // quit
            result = true
            break
        }
    }
    return result
}

/**
 * This function will only delete the BrowerWindow object from the array.
 * @param {String} pageID The ID of the page
 * @returns {Boolean}
 */
const wipeOutWindow = (pageID) => {
    let result = false
    for (let i = 0; i < windowsList.length; i++) {
        if (windowsList[i].id === result) {
            // delete from the array
            windowsList.splice(i, 1)
            // quit
            result = true
            break
        }
    }
    return result
}

module.exports = {
    createNewWindow,
    closeWindow,
    windowsList
}