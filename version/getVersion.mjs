/**
 * Entry function for get app version.
 * Runs several times for each vite configs and electron-builder config.
 * @return {string}
 */
export function getVersion() {
    const now = new Date()

    return `v${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`
}
