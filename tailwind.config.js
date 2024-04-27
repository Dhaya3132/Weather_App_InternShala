/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        'OpenSans':['Open Sans'],
      },
      colors:{
        'Button':'#A52A2A',
        'Background':'#ffffff',
        'GreyBox':'#f5f5f5',
      },
      screens: {
        // 'ssm': {'max': '426px'},
        // => @media (max-width: 427px)
      }
    },
  },
  plugins: [],
}