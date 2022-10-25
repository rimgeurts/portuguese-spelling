/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    sans: [
      'Inter',
      'Arial',
      'Courier New',
      'Georgia',
      'Times New',
      'Trebuchet MS',
      'Verdana',
    ],
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}