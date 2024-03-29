import type { Event } from 'electron'
import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { URL } from 'url'

async function createWindow() {
    const browserWindow = new BrowserWindow({
        show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
        titleBarStyle: 'hidden',
        width: 900,
        height: 493,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
            webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
            preload: join(app.getAppPath(), 'packages/preload/dist/index.cjs'),
        },
    })

    /**
     * If you install `show: true` then it can cause issues when trying to close the window.
     * Use `show: false` and listener events `ready-to-show` to fix these issues.
     *
     * @see https://github.com/electron/electron/issues/25012
     */
    browserWindow.on('ready-to-show', () => {
        if (import.meta.env.DEV) {
            browserWindow?.webContents.openDevTools()
        }
    })

    browserWindow.on('minimize', function (event: Event) {
        event.preventDefault()

        browserWindow.setSkipTaskbar(true)
    })

    browserWindow.on('restore', function (event: Event) {
        event.preventDefault()

        browserWindow.setSkipTaskbar(false)
    })
    /**
     * URL for main window.
     * Vite dev server for development.
     * `file://../renderer/index.html` for production and test
     */
    const pageUrl =
        import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
            ? import.meta.env.VITE_DEV_SERVER_URL
            : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString()

    await browserWindow.loadURL(pageUrl)

    return browserWindow
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
    let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed())

    if (window === undefined) {
        window = await createWindow()
    }

    if (window.isMinimized()) {
        window.restore()
    }

    window.focus()

    return window
}
