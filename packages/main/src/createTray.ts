import type { BrowserWindow } from 'electron'
import { Tray, Menu } from 'electron'
import icon from './getTrayIcon'

export const createTray = (mainWindow: BrowserWindow) => {
    const tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        {
            label: import.meta.env.VITE_APP_VERSION || 'DEVELOPMENT',
            role: 'about',
        },
        { type: 'separator' },
        {
            label: 'Config',
            click: function () {
                mainWindow.show()
            },
        },
        { type: 'separator' },
        {
            label: 'Close',
            role: 'quit',
        },
    ])

    tray.on('double-click', function () {
        mainWindow.show()
    })

    tray.setToolTip('Andromeda HTTP Thermal Print Server')

    tray.setContextMenu(contextMenu)

    return tray
}
