/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html, js}"],
  theme: {
    extend: {
      fontFamily:{
        'Questrial':['Questrial'],
      },
      colors:{
        'Button':'#5A4FCF',
        'Background':'#ffffff',
        'GreyBox':'#F7F7F7',
        'Neon':'#FEFEFA',
        'Buttons':'#FFFFFF',
        'Dark':'#1b1b1b',
        'Elephant':'#8b8b8b',
      },
      screens: {
        'Laptop-M': {'max': '1025px'},
        'Tabelt': {'max': '769px'},
        'Mobile-L':{'max':'426px'},
        'Mobile-M':{'max':'376px'},
        'Mobile-S':{'max':'321px'}
      }
    },
  },
}