/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          warm: '#f59e0b',
          cool: '#06b6d4',
        },
        surface: {
          dark: '#0f172a',
          DEFAULT: '#1e293b',
          light: '#334155',
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'weather-sunny': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'weather-cloudy': 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
        'weather-rainy': 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
        'weather-night': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }
    },
  },
  plugins: [],
}
