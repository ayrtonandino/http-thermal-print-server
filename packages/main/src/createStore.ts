import type { Schema } from 'electron-store'
import ElectronStore from 'electron-store'
import migrations from './migrations'

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
    migrations,
})
