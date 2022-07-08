import configStore from '../../main/src/createStore'
import { ipcRenderer } from 'electron'

export function closeWindow(): void {
    ipcRenderer.send('closeWindow')
}

export function getCoreData(): App.Config {
    return configStore.store
}

export function setCoreData(value: object): void {
    return configStore.set(value)
}

export function getConfigValue(key: string): string | number {
    return configStore.get(key)
}

export function setConfigValue(key: string, value: object | string | number): void {
    return configStore.set(key, value)
}

export const api = {
    closeWindow,
    getCoreData,
    setCoreData,
    getConfigValue,
    setConfigValue,
}
