/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a"}
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar::-webkit-scrollbar': {
          'background-color': '#000',
          'width': '16px',
          'height': '16px',
        },
        '.scrollbar::-webkit-scrollbar-track': {
            'background-color': '#1e293b',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
            'background-color': '#babac0',
            'border-radius': '16px',
            'border': '5px solid #1e293b',
        },
        '.scrollbar::-webkit-scrollbar-button': {
            'display': 'none',
        }
      })
    })
  ]
};
