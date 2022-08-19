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
    printer.drawLine()

    printer.alignCenter()
    printer.code128('Code128')

    printer.setTextQuadArea()
    printer.println(String(data.codigo).toUpperCase())
    printer.setTextNormal()
    printer.newLine()
    printer.println(String(data.codigo).toUpperCase())
    printer.println(String(data.producto).toUpperCase())

    printer.drawLine()

    printer.cut()
}

export { tagValidation, createTag }
