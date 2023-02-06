/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            animation: {
                'opacity': 'opacity 2s ease-in-out',
            },
            keyframes: {
                'opacity': {
                    '0%' : { opacity: 0 },
                    '100%': { opacity: 100 }
                }
            }
        },
    },
    plugins: [],
}
