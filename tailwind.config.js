/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4A90E2",
          DEFAULT: "#4A90E2",
          dark: "#6BB6FF",
        },
        secondary: {
          light: "#7B61FF",
          DEFAULT: "#7B61FF",
          dark: "#9582FF",
        },
        background: {
          light: "#FFFFFF",
          dark: "#121417",
        },
        surface: {
          light: "#F7F9FC",
          dark: "#1C1F24",
        },
        text: {
          DEFAULT: "#1E1E1E",
          secondary: "#4F4F4F",
          dark: "#F1F1F1",
          secondaryDark: "#C9C9C9",
        },
        success: {
          DEFAULT: "#2ECC71",
          dark: "#27AE60",
        },
        warning: {
          DEFAULT: "#F1C40F",
          dark: "#F39C12",
        },
        error: {
          DEFAULT: "#E74C3C",
          dark: "#C0392B",
        },
      },
    },
  },
  plugins: [],
};
