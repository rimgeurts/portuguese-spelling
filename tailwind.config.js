const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        // "Inter",
        // "-apple-system",
        // "Inter",
        "Poppins",
        "Arial",
        "Courier New",
        "Georgia",
        "Times New",
        "Trebuchet MS",
        "Verdana",
      ],
    },
    extend: {},
  },

  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)");
    }),
  ],
};
