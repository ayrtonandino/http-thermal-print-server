if (process.env.VITE_APP_VERSION === undefined) {
    const now = new Date()

    const year = String(now.getUTCFullYear() - 2000)

    const month = String(now.getUTCMonth() + 1).padStart(2, '0')

    const day = String(now.getUTCDate()).padStart(2, '0')

    const stamp = String(now.getUTCHours() * 60 + now.getUTCMinutes())

    process.env.VITE_APP_VERSION = `${year}${month}.${day}-${stamp}`
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
    directories: {
        output: 'dist',
        buildResources: 'buildResources',
    },
    files: ['packages/**/dist/**'],
    extraMetadata: {
        version: process.env.VITE_APP_VERSION,
    },
}

module.exports = config
