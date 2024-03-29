import type { BrowserWindow } from 'electron'
import { app } from 'electron'
import './security-restrictions'
import { restoreOrCreateWindow } from '/@/mainWindow'
import { createTray } from '/@/createTray'
import { startServer } from '/@/server'

let mainWindow: BrowserWindow | null = null

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock()

if (!isSingleInstance) {
    app.quit()
    process.exit(0)
}

app.on('second-instance', restoreOrCreateWindow)

/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration()

app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true,
    enabled: true,
})

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

/**
 * @see https://www.electronjs.org/docs/v14-x-y/api/app#event-activate-macos Event: 'activate'
 */
app.on('activate', restoreOrCreateWindow)

/**
 * Create app window when background process will be ready
 */
app.whenReady()
    .then(async () => {
        startServer()

        mainWindow = await restoreOrCreateWindow()

        createTray(mainWindow)
    })
    .catch((e) => console.error('Failed create window:', e))

/**
 * Check new app version in production mode only
 */
if (import.meta.env.PROD) {
    app.whenReady()
        .then(() => import('electron-updater'))
        .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
        .catch((e) => console.error('Failed check updates:', e))
}

import './createIpc'
