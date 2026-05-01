/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
  plugins: [],
}
