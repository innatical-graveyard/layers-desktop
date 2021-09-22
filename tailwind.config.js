module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
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
        text: {
          DEFAULT: "000000",
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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
