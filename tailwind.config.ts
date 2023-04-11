import type { Config } from 'tailwindcss'

import { join } from 'path'
import defaultTheme from 'tailwindcss/defaultTheme'

import forms from '@tailwindcss/forms'

export default {
    content: [join(__dirname, 'packages/renderer/index.html'), join(__dirname, 'packages/renderer/src/**/*.{vue,js,ts,jsx,tsx}')],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
} satisfies Config
