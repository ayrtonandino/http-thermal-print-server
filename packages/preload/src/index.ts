import { contextBridge } from 'electron'
import { api } from './api'

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    window.api = api
}
