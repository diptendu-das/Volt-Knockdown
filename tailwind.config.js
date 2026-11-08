/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Impact"', '"Bebas Neue"', 'sans-serif'],
        heading: ['"Teko"', '"Barlow Condensed"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        blood: {
          500: '#ff1a35',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          glow: '#ff003c'
        },
        predator: {
          400: '#38bdf8',
          500: '#0284c7',
          cyan: '#00f0ff',
        },
        gold: {
          champ: '#f59e0b',
          glow: '#ffd700'
        },
        titanium: {
          950: '#060608',
          900: '#0b0b0f',
          850: '#111117',
          800: '#171720',
          700: '#232330',
        }
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s ease-in-out infinite alternate',
        'clash': 'clash 2s ease-in-out infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '0.92' },
          '100%': { opacity: '1' }
        },
        clash: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}

