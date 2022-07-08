import { ipcMain, BrowserWindow } from 'electron'

ipcMain.on('closeWindow', (event) => {
    BrowserWindow.getAllWindows()
        .find((window) => window.id === event.frameId)
        ?.minimize()
})
