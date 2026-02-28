/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // StudyFlow Aurora Design System
        bg: {
          DEFAULT: '#07070d',
          2: '#0c0c14',
        },
        surface: {
          DEFAULT: '#111119',
          2: '#161622',
          3: '#1c1c2a',
        },
        border: {
          DEFAULT: '#1a1a28',
          2: '#232338',
          3: '#2e2e4a',
        },
        ink: {
          DEFAULT: '#f0f0ff',
          2: '#6e6e9a',
          3: '#333355',
        },
        accent: {
          DEFAULT: '#a78bfa',
          2: '#c4b5fd',
        },
        aurora: {
          cyan: '#22d3ee',
          cyan2: '#67e8f9',
          green: '#4ade80',
          pink: '#f472b6',
          yellow: '#fbbf24',
          red: '#f87171',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #a78bfa, #22d3ee)',
        'aurora-btn': 'linear-gradient(135deg, #a78bfa, #7c3aed)',
        'card-shine': 'linear-gradient(90deg, transparent, rgba(167,139,250,0.08), transparent)',
      },
      boxShadow: {
        'glow-accent': '0 0 24px rgba(167,139,250,0.2), 0 0 48px rgba(167,139,250,0.08)',
        'glow-cyan': '0 0 24px rgba(34,211,238,0.2)',
        'card': '0 4px 20px rgba(0,0,0,0.85)',
        'card-hover': '0 16px 56px rgba(0,0,0,0.9)',
        'xl-dark': '0 32px 96px rgba(0,0,0,0.95)',
      },
      animation: {
        'aurora-shift': 'auroraShift 12s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        auroraShift: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(60px,40px) scale(1.1)' },
          '100%': { transform: 'translate(-30px,80px) scale(0.95)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(167,139,250,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(167,139,250,0.35)' },
        },
      },
    },
  },
  plugins: [],
}
