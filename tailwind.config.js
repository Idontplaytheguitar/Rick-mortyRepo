/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'GetSchwifty': ['GetSchwifty'],
      },
      backgroundImage:{
        'rick&morty': "url('/rick&morty.jpg')",
      },
      transformStyle: { // Add this
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: { // Add this
        'hidden': 'hidden',
        'visible': 'visible',
      },
    },
  },
  variants: { // Add this
    extend: {
      transformStyle: ['responsive'],
      backfaceVisibility: ['responsive'],
    },
  },
  plugins: [],
}
