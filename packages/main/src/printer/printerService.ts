import { printer as ThermalPrinter, types as Types } from 'node-thermal-printer'
import store from './../createStore'

class superPrinter extends ThermalPrinter {
    code128(data: string) {
        this.buffer = 

        const BARCODE_CODE128 = Buffer.from([0x1d, 0x6b, 0x49])

        this.append(Buffer.from([0x1d, 0x48, 0x00]))

        this.append(Buffer.from([0x1d, 0x66, 0x00]))

        this.append(Buffer.from([0x1d, 0x77, 0x03]))

        this.append(Buffer.from([0x1d, 0x68, 0xa2]))

        // Print Barcode
        this.append(BARCODE_CODE128)

        this.append(Buffer.from([data.length + 2]))
        this.append(Buffer.from([0x7b, 0x42]))

        // Data
        this.append(Buffer.from(data))
    }
}

function newPrinter(url = 'tcp://127.0.0.1', port: string | number = 9000, model = 'EPSON') {
    return new superPrinter({
        type: model === 'EPSON' ? Types.EPSON : Types.STAR,
        interface: `${url}:${port}`,
    })
}

function getPrinter() {
    return newPrinter(store.get('printerUrl'), store.get('printerPort'), store.get('printerModel'))
}

export { newPrinter, getPrinter }
