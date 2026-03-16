/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rasrang-pink': '#FF007F',
        'rasrang-yellow': '#FFD700',
        'rasrang-cyan': '#00FFFF',
        'rasrang-black': '#0A0A0A',
        'rasrang-charcoal': '#1A1A1A',
      },
      fontFamily: {
        cinema: ['Cinzel', 'serif'],
        marquee: ['"Bebas Neue"', 'cursive'],
        typewriter: ['"Courier Prime"', 'monospace'],
      },
      animation: {
        'burn-away': 'burn 1.5s ease-out forwards',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        burn: {
          '0%': { clipPath: 'inset(0% 0% 0% 0%)', opacity: '1' },
          '100%': { clipPath: 'inset(50% 50% 50% 50%)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
