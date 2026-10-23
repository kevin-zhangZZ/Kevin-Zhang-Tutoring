import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Inter everywhere, served as a web font so every visitor sees the same text. `display`
        // (headings, labels, numbers) is kept as its own name but is the same family.
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Trig ratio colors — CSS variables in index.css, with a darker shade in light mode
        sin: 'var(--color-sin)',   // pink
        cos: 'var(--color-cos)',   // sky blue
        tan: 'var(--color-tan)',   // emerald green
      },
      transitionProperty: {
        'opacity-transform': 'opacity, transform',
      },
    },
  },
  plugins: [containerQueries],
}
