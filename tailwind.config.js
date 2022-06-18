/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        style: ['Leckerli One', 'cursive'],
      },
      colors: {
        purple: {
          blueish: '#6C63FF',
        },
        darkBlue: {
          100: '#3F3D56',
        },
        light: {
          100: '#e7e0e0',
        },
      },
    },
  },
  plugins: [],
};
