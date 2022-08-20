import { Joi } from 'express-validation'
import type { printer as printerType } from 'node-thermal-printer'

interface TagData {
    codigo: string
    producto: string
    color?: string | null
    talle?: string | null
}

const tagValidation = {
    body: Joi.array()
        .items(
            Joi.object({
                codigo: Joi.string().required(),
                producto: Joi.string().required(),
                color: Joi.string().allow('', null),
                talle: Joi.string().allow('', null),
            })
        )
        .required(),
}

function createTag(printer: printerType, data: TagData[]): void {
    data.forEach((tag) => {
        const codigo = String(tag.codigo).toUpperCase()
        const descripcion = String(`${tag.producto} ${tag.color || ''} ${tag.talle || ''}`).toUpperCase()

        printer.alignCenter()

        printer.drawLine()
        printer.newLine()

        printer.code128(codigo, {
            height: 81,
            width: 'SMALL',
        })

        printer.newLine()

        printer.println(codigo)

        printer.setTypeFontB()

        printer.println(descripcion)

        printer.setTypeFontA()
        printer.drawLine()

        printer.cut()
    })
}

export { tagValidation, createTag }
