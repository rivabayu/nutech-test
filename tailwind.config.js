/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
    },
    container: {
      padding: {
        DEAFAULT: '40px',
      },
    },
    extend: {
      backgroundImage: {
        'CommonBg': "url('../src/aseet/bgcommon.jpg')"
      },
      colors: {
        heroBgColor: '#d6e5fb',
      }
    },

  },
  plugins: [require
    ("daisyui", 'tailwind-scrollbar')],
}