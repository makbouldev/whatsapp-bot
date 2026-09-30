/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wa: {
          green: '#25D366',
          darkGreen: '#128C7E',
          teal: '#075E54',
          lightGreen: '#DCF8C6',
          accent: '#34B7F1',
          chatBg: '#0b141a',
          bubbleOut: '#005c4b',
          bubbleIn: '#202c33'
        },
        obsidian: {
          DEFAULT: '#06090e',
          surface: '#0d131d',
          card: '#131c2a',
          border: '#1f2d42',
          light: '#2a3b54'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
        'typing-bounce': 'typingBounce 1.4s infinite ease-in-out both',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(37, 211, 102, 0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(37, 211, 102, 0.8), 0 0 50px rgba(37, 211, 102, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typingBounce: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      boxShadow: {
        'glow-green': '0 0 30px -5px rgba(37, 211, 102, 0.5)',
        'glow-teal': '0 0 30px -5px rgba(18, 140, 126, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
