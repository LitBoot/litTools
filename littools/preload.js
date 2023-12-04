const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("windowEvent", {
    triggerOnClose: (windowID)=>ipcRenderer.invoke("windowEvent:triggerOnClose", windowID)
})