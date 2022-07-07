import { app, Tray, Menu } from 'electron'
import path from 'path'

export const createTray = () => {
    const icon = path.join(__dirname, '../../renderer/assets/favicon.ico')

    const tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Configurar' },
        {
            label: 'Cerrar',
            click: function () {
                app.quit()
            },
        },
    ])

    tray.setToolTip('HTTP Thermal Print Server')

    tray.setContextMenu(contextMenu)

    return tray
}
