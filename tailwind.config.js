/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        light: {
          bg: {
            primary: "#FFFFFF",
            secondary: "#F8F9FA",
            card: "#FAFBFC",
          },
          text: {
            primary: "#2C3E50",
            secondary: "#5A6C7D",
            muted: "#95A5A6",
          },
          brand: {
            primary: "#667EEA",
            secondary: "#764BA2",
          },
          link: {
            DEFAULT: "#667EEA",
            hover: "#5568D3",
            visited: "#8B76C4",
          },
        },
        // Dark Theme Colors
        dark: {
          bg: {
            primary: "#1A1D23",
            secondary: "#252932",
            card: "#2D3139",
          },
          text: {
            primary: "#E8EAED",
            secondary: "#B8BABF",
            muted: "#7A7D85",
          },
          brand: {
            primary: "#7B90FF",
            secondary: "#9B7BC6",
          },
          link: {
            DEFAULT: "#8B9CFF",
            hover: "#A5B3FF",
            visited: "#B39DDB",
          },
        },
        // Status Colors (work for both themes)
        success: {
          light: "#4CAF50",
          dark: "#66BB6A",
          DEFAULT: "#4CAF50",
        },
        warning: {
          light: "#FFB74D",
          dark: "#FFA726",
          DEFAULT: "#FFB74D",
        },
        error: {
          light: "#EF5350",
          dark: "#EF5350",
          DEFAULT: "#EF5350",
        },
        info: {
          light: "#64B5F6",
          dark: "#42A5F5",
          DEFAULT: "#64B5F6",
        },
      },
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
  daisyui: {
    themes: false,
  },
};