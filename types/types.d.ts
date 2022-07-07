declare namespace App {
    export interface Config {
        printerUrl: string
        printerPort: string
        printerModel: string
    }

    export interface ElectronStore {
        set: (key: string, value: string | number) => void
    }

    export interface Migration {
        version: string
        migration: (store: App.ElectronStore) => void
    }

    export interface Api {
        getCoreData: () => App.Config
        setCoreData: (value: object) => void
        getConfigValue: (key: string) => string | number
        setConfigValue: (key: string, value: object | string | number) => void
    }
}
