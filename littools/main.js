const { app, BrowserWindow, Tray, Menu } = require('electron')
const prelaunchCheck = require("./library/prelaunchEvents/prelaunch")
const windowManager = require("./library/windows/windowManager")
const path = require("path")

/**
 * @type {BrowserWindow}
 */
let win = null
const windowID = {
    "main": "litTools:mainWindow",
}

const createMainWindow = () => {
    windowManager.createNewWindow(
        {
            width: 300,
            height: 400,
            frame: false,
            webPreferences: {
                nodeIntegration: true
            }
        },
        path.join(__dirname, "interface", "main.html"),
        windowID.main
    )
}

app.whenReady().then(() => {

    // Create tray
    const tray = new Tray("./icon/icon.png")
    tray.setToolTip("LitTools")
    const trayContextMenu = Menu.buildFromTemplate([
        {
            label: "打开主界面",
            click: () => {
                createMainWindow()
            }
        },
        {
            label: "打开设置",
        },
        {
            label: "退出LitTools",
            click: ()=>{
                app.quit()
            }
        },
        {
            label: "Print Window Manager Status",
            click: ()=>{
                console.log(windowManager.windowsList)
            }
        }
    ])
    tray.on("click", () => {
        console.log("Open mini panel")
    })
    tray.on("right-click", ()=>{
        tray.popUpContextMenu(trayContextMenu)
    })
    
    // Pre-launch functions needs to be exected here
    let result = prelaunchCheck.prelaunchCheck()
    if (!result) {
        app.quit()
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    console.log("All windows closed but app keep running")
    console.log(windowManager.windowsList)
})


/**
 * Handle all IPC events for the app. In order to process the win it will under the main file
 */
function ipcHandler() {

}