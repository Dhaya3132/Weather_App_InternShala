/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        'OpenSans':['Open Sans'],
      },
      colors:{
        'Button':'#F94D00',
        'Background':'#ffffff',
        'GreyBox':'#F7F7F7',
      },
      screens: {
        // 'ssm': {'max': '426px'},
        // => @media (max-width: 427px)
      }
    },
  },
  plugins: [],
}