/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000', // Pitch black
          light: '#0a0a0a', // Deep gunmetal/grey
        },
        secondary: {
          DEFAULT: '#a1a1aa', // Muted text
          dark: '#27272a', // Subtle borders
        },
        accent: {
          DEFAULT: '#ffffff', // High contrast
          hover: '#e4e4e7',
          steel: '#3f3f46',
          blue: '#1e3a8a', // Deep blue industrial accent
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};
