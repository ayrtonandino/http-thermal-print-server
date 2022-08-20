import store from './createStore'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { validate, ValidationError } from 'express-validation'
import { getPrinter } from './printer/printerService'
import { createTicket, ticketValidation } from './printer/ticketService'
import { createTag, tagValidation } from './printer/tagService'
import type { printer as ThermalPrinter } from 'node-thermal-printer'

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/status', async (request, response) => {
    try {
        console.log('Printer test connection')

        const printer = getPrinter()

        const isConnected = await printer.isPrinterConnected()

        if (!isConnected) {
            return response.status(400).json({
                error: 'Printer not connected',
                printerData: {
                    printerUrl: store.get('printerUrl'),
                    printerPort: store.get('printerPort'),
                    printerModel: store.get('printerModel'),
                },
            })
        }
    } catch (error: any) {
        console.error('Print connection error:', error)

        return response.status(500).json({
            status: 'error',
            message: error.message,
        })
    }

    response.json({ status: 'Server Online' })
})

app.get('/print', async (request, response) => {
    try {
        console.log('Printer test connection')

        const printer = getPrinter()

        const isConnected = await printer.isPrinterConnected()

        if (!isConnected) {
            return response.status(400).json({
                error: 'Printer not connected',
                printerData: {
                    printerUrl: store.get('printerUrl'),
                    printerPort: store.get('printerPort'),
                    printerModel: store.get('printerModel'),
                },
            })
        }
    } catch (error: any) {
        console.error('Print connection error:', error)

        return response.status(500).json({
            status: 'error',
            message: error.message,
        })
    }

    response.json({ status: 'Server Online' })
})

app.post('/print', validate(ticketValidation, { keyByField: true }, {}), async (request, response) => {
    let printer: ThermalPrinter | null = null

    try {
        console.log('Print start!')

        printer = getPrinter()

        const isConnected = await printer.isPrinterConnected()

        if (!isConnected) {
            return response.status(400).json({
                status: 'error',
                message: 'Printer not connected',
            })
        }
    } catch (error: any) {
        console.error('Print connection error:', error)

        return response.status(500).json({
            status: 'error',
            message: error.message,
        })
    }

    try {
        console.info('Create ticket')

        createTicket(printer, request.body)

        await printer.execute()

        console.log('Print success!')
    } catch (error: any) {
        console.error('Print error:', error)

        return response.status(500).json({
            status: 'error',
            message: error.message,
        })
    }

    response.json({ status: 'Print success!' })
})

app.post('/tag', validate(tagValidation, { keyByField: true }, {}), async (request, response) => {
    let printer: ThermalPrinter | null = null

    try {
        console.log('Print tag start!')

        printer = getPrinter()

        const isConnected = await printer.isPrinterConnected()

        if (!isConnected) {
            return response.status(400).json({
                status: 'error',
                message: 'Printer not connected',
            })
        }
    } catch (error: any) {
        console.error('Print connection error:', error)

        return response.status(500).json({
            status: 'error',
            message: error.message,
        })
    }

    try {
        console.info('Create tag')

        createTag(printer, request.body)

        await printer.execute()

        console.log('Print tag successful!')
    } catch (error: any) {
        console.error('Print error:', error)

        return response.status(500).json({
            status: 'error',
            message: error.message,
        })
    }

    response.json({ status: 'Print tag successful!' })
})

app.use(function (error, response) {
    if (error instanceof ValidationError) {
        console.error('Validation error:', error)

        return response.status(error.statusCode).json({ error: error })
    }

    return response.status(500).json({ error: error })
})

export function startServer(port = 3005) {
    app.listen(port, () => console.log(`Server running on port ${port}!`))
}
