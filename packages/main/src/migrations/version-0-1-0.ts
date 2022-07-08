export default {
    '0.1.0': (store: App.ElectronStore): void => {
        store.set('printerUrl', 'tcp://127.0.0.1')
        store.set('printerPort', 9100)
        store.set('printerModel', 'EPSON')
    },
}
