const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [path.join(__dirname, 'packages/renderer/index.html'), path.join(__dirname, 'packages/renderer/src/**/*.{vue,js,ts,jsx,tsx}')],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
}
