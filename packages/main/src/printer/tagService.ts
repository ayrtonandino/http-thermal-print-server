import { Joi } from 'express-validation'
import type { printer as printerType } from 'node-thermal-printer'

interface TagData {
    codigo: string
    producto: string
    color?: string | null
    talle?: string | null
}

const tagValidation = {
    body: Joi.object({
        codigo: Joi.string().required(),
        producto: Joi.string().required(),
        color: Joi.string().allow('', null),
        talle: Joi.string().allow('', null),
    }),
}

function createTag(printer: printerType, data: TagData): void {
    const codigo = String(data.codigo).toUpperCase()
    const descripcion = String(`${data.producto} ${data.color || ''} ${data.talle || ''}`).toUpperCase()

    printer.alignCenter()

    printer.drawLine()
    printer.newLine()

    printer.code128(codigo)

    printer.newLine()

    printer.println(codigo)

    printer.setTypeFontB()

    printer.println(descripcion)

    printer.drawLine()

    printer.cut()
}

export { tagValidation, createTag }
