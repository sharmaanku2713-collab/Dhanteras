/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bhagva: '#FF6A00',
          orange: '#FF8A00',
          dark: '#07090D',
          navy: '#0B1422',
          gold: '#FFD166',
          goldLight: '#FFE29F',
          goldWarm: '#E5A93B',
          white: '#F5F7FA',
          glow: '#FFAA00'
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        sanskrit: ['"Rozha One"', '"Cinzel"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'diya-flicker': 'diyaFlicker 2.5s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'cloud-left': 'cloudLeft 20s ease-in-out infinite alternate',
        'cloud-right': 'cloudRight 22s ease-in-out infinite alternate',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        diyaFlicker: {
          '0%': { opacity: '0.85', transform: 'scale(0.98)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '0.9', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(255, 138, 0, 0.4))' },
          '50%': { opacity: '0.95', filter: 'drop-shadow(0 0 25px rgba(255, 209, 102, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        cloudLeft: {
          '0%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(5%)' },
        },
        cloudRight: {
          '0%': { transform: 'translateX(5%)' },
          '100%': { transform: 'translateX(-5%)' },
        }
      }
    },
  },
  plugins: [],
}
