/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cobalt: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bbd9ff',
          300: '#8dc0fe',
          400: '#589efc',
          500: '#0047AB', // Primary Cobalt Blue
          600: '#003a8f',
          700: '#002f74',
          800: '#00265e',
          900: '#001a40',
          950: '#000e26',
        },
        surface: {
          light: '#FFFFFF',
          muted: '#F8FAFC',
          card: '#0B1120',
          subtle: '#111827',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(0, 71, 171, 0.45)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cobalt-glow': '0 0 25px -3px rgba(0, 71, 171, 0.45)',
        'cobalt-lg': '0 0 50px -5px rgba(0, 71, 171, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
