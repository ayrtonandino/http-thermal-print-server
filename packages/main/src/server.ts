import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { validate, ValidationError } from 'express-validation'
import { newPrinter } from './printer/printerService'
import { createTicket, printValidation } from './printer/ticketService'
import store from './createStore'

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/print', async (request, response) => {
    try {
        console.log('Printer test connection')

        const printer = newPrinter(store.get('printerUrl'), store.get('printerPort'), store.get('printerModel'))

        const isConnected = await printer.isPrinterConnected()

        if (!isConnected) {
            return response.status(400).send({
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

app.post('/print', validate(printValidation, { keyByField: true }, {}), async (request, response) => {
    let printer = null

    try {
        console.log('Print start!')

        printer = newPrinter(store.get('printerUrl'), store.get('printerPort'), store.get('printerModel'))

        const isConnected = await printer.isPrinterConnected()

        if (!isConnected) {
            return response.status(400).send('Printer not connected')
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

        createTicket(printer, request.body.data)

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

app.use(function (err: any, req: any, res: any) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
})

export function startServer(port = 3005) {
    app.listen(port, () => console.log(`Server running on port ${port}!`))
}
