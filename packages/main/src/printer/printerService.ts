import { printer as ThermalPrinter, types as Types } from 'node-thermal-printer'
import store from './../createStore'

class SuperPrinter extends ThermalPrinter {
    code128(
        data: string,
        settings?: {
            width?: 'LARGE' | 'SMALL' | 'MEDIUM'
            height?: number
        }
    ) {
        const BARCODE_CODE128 = Buffer.from([0x1d, 0x6b, 0x49])

        this.append(Buffer.from([0x1d, 0x48, 0x00]))

        this.append(Buffer.from([0x1d, 0x66, 0x00]))

        // Set width 2-6, default 3
        if (settings && settings.width) {
            let width: number | null = null

            switch (settings.width) {
                case 'LARGE':
                    width = 6
                    break

                case 'SMALL':
                    width = 2
                    break

                case 'MEDIUM':
                    width = 4
                    break

                default:
                    width = 3
                    break
            }

            this.append(Buffer.from([0x1d, 0x77])) // GS W
            this.append(Buffer.from([width]))
        } else {
            this.append(Buffer.from([0x1d, 0x77, 0x03]))
        }

        // Set height 1 - 255 default 162
        if (settings && settings.height) {
            this.append(Buffer.from([0x1d, 0x68])) // GS h
            this.append(Buffer.from([settings.height]))
        } else {
            this.append(Buffer.from([0x1d, 0x68, 0xa2]))
        }

        // Print Barcode
        this.append(BARCODE_CODE128)

        this.append(Buffer.from([data.length + 2]))
        this.append(Buffer.from([0x7b, 0x42]))

        // Data
        this.append(Buffer.from(data))
    }
}

function newPrinter(url = 'tcp://127.0.0.1', port: string | number = 9000, model = 'EPSON') {
    return new SuperPrinter({
        type: model === 'EPSON' ? Types.EPSON : Types.STAR,
        interface: `${url}:${port}`,
    })
}

function getPrinter() {
    return newPrinter(store.get('printerUrl'), store.get('printerPort'), store.get('printerModel'))
}

export { newPrinter, getPrinter }
