/* eslint-env node */

import { chrome } from '../../.electron-vendors.cache.json'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import type { UserConfig } from 'vite'

const PACKAGE_ROOT = __dirname

const config: UserConfig = {
    mode: process.env.MODE,

    root: PACKAGE_ROOT,

    resolve: {
        alias: {
            '/@/': join(PACKAGE_ROOT, 'src') + '/',
        },
    },

    base: '',

    server: {
        fs: {
            strict: true,
        },
    },

    build: {
        sourcemap: true,
        target: `chrome${chrome}`,
        outDir: 'dist',
        assetsDir: '.',
        rollupOptions: {
            input: join(PACKAGE_ROOT, 'index.html'),
        },
        emptyOutDir: true,
        reportCompressedSize: false,
    },

    plugins: [vue()],
}

export default config
