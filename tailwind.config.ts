import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 24px 80px -20px rgba(56, 189, 248, 0.35)',
      },
      fontFamily: {
        sans: ['"Aptos"', '"Segoe UI Variable"', 'system-ui', 'sans-serif'],
        display: ['"Aptos Display"', '"Segoe UI Variable"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.2) 1px, transparent 0), linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.82))',
      },
    },
  },
  plugins: [],
} satisfies Config;
