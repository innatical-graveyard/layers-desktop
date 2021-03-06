const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
      },
      colors: {
        inndigo: {
          DEFAULT: "#1e6feb",
        },
        sidebar: {
          DEFAULT: "#F7F7F7",
          dark: "#131313",
        },
        secondary: {
          DEFAULT: "#979797",
        },
        background: {
          DEFAULT: "#F7F7F7",
          dark: "#1A1A1A",
        },
        "primary-sidebar": {
          DEFAULT: "#FFFFFF",
          dark: "#272727",
        },
        "primary-sidebar-selected": {
          DEFAULT: "#EFEFEF",
          dark: "#343434",
        },
        text: {
          DEFAULT: "#000000",
          dark: "#F5F5F5",
        },
        "chat-input-elements": {
          DEFAULT: "#FFFFFF",
          dark: "#272727",
        },
        "servers-sidebar": {
          DEFAULT: "#FEFEFE",
          dark: "#191919",
        },
        "input-elements": {
          DEFAULT: "#FFFFFF",
          dark: "#272727",
        },
        "row-stripe": {
          DEFAULT: "#F7F7F7",
          dark: "#131313",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#212121",
        },
        modal: {
          DEFAULT: "#FFFFFF",
          dark: "#212121",
        },
        placeholder: {
          DEFAULT: "#FFFFFF",
          dark: "#272727",
        },
        danger: {
          DEFAULT: "#EF4444",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["odd"],
    },
  },
  plugins: [
    // Provides an aspect ratio implementation for tailwind
    plugin(function ({ addUtilities }) {
      let ratios = {};

      for (let i = 1; i <= 16; i++) {
        for (let j = 1; j <= 16; j++) {
          ratios[`.ratio-${i}-${j}`] = {
            aspectRatio: `${i}/${j}`,
          };
        }
      }

      addUtilities(ratios);
    }),
  ],
};
