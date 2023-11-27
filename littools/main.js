const { app, BrowserWindow } = require('electron')
const prelaunchCheck = require("./library/prelaunchEvents/prelaunch")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 300
    })

    win.loadFile('./dist/index.html')
}

app.whenReady().then(() => {
    
    // check first
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