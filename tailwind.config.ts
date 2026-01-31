import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'costco-red': '#E31837',
        'costco-blue': '#005DAA',
        'price-tag-yellow': '#FFD100',
        'warehouse-white': '#1F2937',
        'warehouse-gray': '#374151',
        'warehouse-dark': '#111827',
        'text-dark': '#F3F4F6',
        'text-muted': '#9CA3AF',
        'hotdog-red': '#E31837',
        'bigmac-orange': '#dd6b20',
        'wage-green': '#38a169',
        'movie-purple': '#9333ea',
      },
      fontFamily: {
        'costco': ['"Nunito Sans"', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(227, 24, 55, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(227, 24, 55, 0.9))' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
