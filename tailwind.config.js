/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans : ['Montserrat', 'sans-serif']
    },
    container:{
      padding: {
        DEAFAULT : '40px',
      },
    },
    extend: {
     
      colors:{
        heroBgColor : '#d6e5fb',
        smallText : '#999',
        headingText: '#0a1d37',
        cartBg1:'#fdefe6',
        cartBg2:'#d6e5fb',
        cartBg3:'#ceebe9',
        cartBg4:'#e2f2b2',
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
  },
  plugins: [require("daisyui")],
}