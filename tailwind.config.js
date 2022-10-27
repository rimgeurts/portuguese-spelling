module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'Arial',
        'Courier New',
        'Georgia',
        'Times New',
        'Trebuchet MS',
        'Verdana',
      ],
    },
    extend: {},
  },

  plugins: [require('@tailwindcss/forms')],
};
