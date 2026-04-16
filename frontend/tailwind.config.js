/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0f172a',
          surface: '#111827',
          border: '#1e293b',
          muted: '#334155',
          text: '#e2e8f0',
          dim: '#64748b',
          danger: '#ef4444',
          'danger-dim': '#7f1d1d',
          warn: '#f59e0b',
          'warn-dim': '#78350f',
          safe: '#22c55e',
          'safe-dim': '#14532d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        pulse_danger: {
          '0%, 100%': { backgroundColor: 'rgba(239,68,68,0.25)', boxShadow: '0 0 0 0 rgba(239,68,68,0)' },
          '50%': { backgroundColor: 'rgba(239,68,68,0.45)', boxShadow: '0 0 10px 4px rgba(239,68,68,0.3)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow_scan: {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
        node_pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0.3' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fade_in: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        border_glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        spin_slow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        pulse_danger: 'pulse_danger 2s ease-in-out infinite',
        glow_scan: 'glow_scan 2s ease-in-out infinite',
        node_pop: 'node_pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        reveal: 'reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fade_in: 'fade_in 0.4s ease-out forwards',
        border_glow: 'border_glow 3s ease-in-out infinite',
        spin_slow: 'spin_slow 2s linear infinite',
      },
      transitionTimingFunction: {
        'poly': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'glow-danger': '0 0 16px rgba(239,68,68,0.35)',
        'glow-warn': '0 0 16px rgba(245,158,11,0.35)',
        'glow-safe': '0 0 16px rgba(34,197,94,0.35)',
        'glow-muted': '0 0 16px rgba(100,116,139,0.2)',
      },
    },
  },
  plugins: [],
}
