/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  // Enable dark mode using a class strategy
  darkMode: 'class',

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. COLORS: Flat structure, linked to CSS variables.
      colors: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        surface: 'var(--color-bg-surface)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          light: 'var(--color-brand-light)',
        },
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },

      // 2. FONT FAMILY: A separate section, at the same level as 'colors'.
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-heading)', 'serif'],
      },

      // 3. BACKGROUND IMAGE: Also a separate section.
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, var(--color-brand), var(--color-brand-hover))',
        'dark-gradient': 'linear-gradient(135deg, #182133, #0b111e)',
      },
      
      // 4. BOX SHADOW: For the glow effect.
      boxShadow: {
        'brand-glow': '0 0 15px 0 rgba(var(--color-brand-rgb), 0.4)',
      },
    },
  },

  // 5. PLUGINS: An array of required plugins.
  plugins: [
    require('daisyui'),
  ],

  // Configure daisyUI to not use its own themes
  daisyui: {
    themes: false,
  },
=======
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
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d
};
