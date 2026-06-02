import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Biru royal — warna dominan logo Desa Mindaka
        primary: {
          50: '#eef4fc',
          100: '#d6e6f8',
          200: '#adc8f0',
          300: '#7aa5e3',
          400: '#4a82d4',
          500: '#1a5296',
          600: '#164785',
          700: '#123b70',
          800: '#0e2f5a',
          900: '#0a2344',
        },
        accent: {
          gold: '#fdd835',
          'gold-dark': '#e6b800',
          red: '#d32f2f',
          'red-dark': '#b71c1c',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
