import { printer as ThermalPrinter, types as Types } from 'node-thermal-printer'

function newPrinter(url = 'tcp://127.0.0.1', port: string | number = 9000, model = 'EPSON') {
    return new ThermalPrinter({
        type: model === 'EPSON' ? Types.EPSON : Types.STAR,
        interface: `${url}:${port}`,
    })
}

export { newPrinter }
