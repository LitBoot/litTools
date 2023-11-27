const { app, BrowserWindow, Tray, Menu } = require('electron')
const prelaunchCheck = require("./library/prelaunchEvents/prelaunch")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 300
    })

    win.loadFile('./dist/index.html')
}

app.whenReady().then(() => {

    // Create tray
    const tray = new Tray("./icon/icon.png")
    tray.setToolTip("LitTools")
    const trayContextMenu = Menu.buildFromTemplate([
        {
            label: "打开设置",
        },
        {
            label: "退出LitTools",
            click: ()=>{
                app.quit()
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
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})