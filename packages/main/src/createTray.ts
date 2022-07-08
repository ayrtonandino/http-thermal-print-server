import type { BrowserWindow } from 'electron'
import { app, Tray, Menu } from 'electron'
import path from 'path'

export const createTray = (mainWindow: BrowserWindow) => {
    const icon = path.join(__dirname, '../../renderer/src/assets/favicon.ico')

    const tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Configurar',
            click: function () {
                mainWindow.show()
            },
        },
        {
            label: 'Cerrar',
            click: function () {
                app.quit()
            },
        },
    ])

    tray.on('double-click', function () {
        mainWindow.show()
    })

    tray.setToolTip('Andromeda HTTP Thermal Print Server')

    tray.setContextMenu(contextMenu)

    return tray
}
