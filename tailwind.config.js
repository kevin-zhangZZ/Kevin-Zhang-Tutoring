import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Aptos first: it's used wherever it's installed (it isn't a web font, so it can't be
        // served to visitors); everyone else gets the fonts after it.
        sans: ['Aptos', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Aptos Display"', 'Aptos', '"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Trig ratio colors (accessible in both light and dark)
        sin: '#e879a0',   // rose-pink
        cos: '#38bdf8',   // sky-blue
        tan: '#34d399',   // emerald-green
      },
      transitionProperty: {
        'opacity-transform': 'opacity, transform',
      },
    },
  },
  plugins: [containerQueries],
}
