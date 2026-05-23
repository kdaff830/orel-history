/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      colors: {
        parchment: {
          50: '#faf8f2',
          100: '#f5f0e6',
          200: '#ebe5d6',
          300: '#ddd5c1',
          400: '#c8bd9e',
          500: '#b0a380',
          600: '#948566',
          700: '#786c52',
          800: '#5c5340',
          900: '#3f3930',
        },
        blood: {
          700: '#5a0011',
          600: '#7a0018',
          500: '#8b0000',
          400: '#a01020',
          300: '#c02030',
          200: '#d44050',
          100: '#e86070',
        },
        victory: {
          600: '#8a7000',
          500: '#a68800',
          400: '#c8a415',
          300: '#dab830',
          200: '#e8cc55',
          100: '#f0dd80',
        },
      },
    },
  },
  plugins: [],
};
