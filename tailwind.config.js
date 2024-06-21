/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C00202',
        secondry: '#F3F3F3',
        appGray: '#868686',
        borderGray: '#DEDEDE',
        appText: '#474747',
      },
    },
  },
  plugins: [],
};
