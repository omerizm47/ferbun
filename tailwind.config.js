/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Newroz fire palette
        fire: {
          50: '#FFF8F0',
          100: '#FFECD4',
          200: '#FFD5A8',
          300: '#FFB86C',
          400: '#FF9A3C',
          500: '#FF7A15',
          600: '#E85D00',
          700: '#C44B00',
          800: '#9A3B00',
          900: '#7A2F00',
        },
        // Kurdish green
        kurdish: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        // Warm cream background
        cream: {
          50: '#FFFDF7',
          100: '#FFF9EB',
          200: '#FFF3D6',
          300: '#FFEABD',
        },
        // Dark tones
        midnight: {
          700: '#1E293B',
          800: '#0F172A',
          900: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
