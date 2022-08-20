import type { Schema } from 'electron-store'
import ElectronStore from 'electron-store'

const schema: Schema<App.Config> = {
    printerUrl: {
        type: 'string',
        format: 'uri',
        default: 'tcp://127.0.0.1',
    },
    printerPort: {
        type: 'number',
        maximum: 65535,
        minimum: 0,
        default: 9000,
    },
    printerModel: {
        type: 'string',
        enum: ['EPSON', 'STAR'],
        default: 'EPSON',
    },
}

export default new ElectronStore({
    schema,
    migrations: {
        '0.1.0': (store: App.ElectronStore): void => {
            store.set('printerUrl', 'tcp://127.0.0.1')
            store.set('printerPort', 9100)
            store.set('printerModel', 'EPSON')
        },
    },
})
