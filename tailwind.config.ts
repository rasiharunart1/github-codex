import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#22d3ee',
          blue: '#60a5fa',
          pink: '#f472b6',
          purple: '#a78bfa'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(34, 211, 238, 0.25)',
        pink: '0 0 30px rgba(244, 114, 182, 0.2)'
      },
      backgroundImage: {
        aurora: 'radial-gradient(circle at top right, rgba(34,211,238,.18), transparent 40%), radial-gradient(circle at bottom left, rgba(244,114,182,.18), transparent 35%)'
      }
    }
  },
  plugins: []
};

export default config;
