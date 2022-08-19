import { chrome } from '../../.electron-vendors.cache.json'
import type { UserConfig } from 'vite'

const PACKAGE_ROOT = __dirname

const config: UserConfig = {
    mode: process.env.MODE,

    root: PACKAGE_ROOT,

    envDir: process.cwd(),

    build: {
        ssr: true,
        sourcemap: 'inline',
        target: `chrome${chrome}`,
        outDir: 'dist',
        assetsDir: '.',
        minify: process.env.MODE !== 'development',
        lib: {
            entry: 'src/index.ts',
            formats: ['cjs'],
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].cjs',
            },
        },
        emptyOutDir: true,
        reportCompressedSize: false,
    },
}

export default config
