/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow)', 'var(--font-jakarta)', 'sans-serif'],
      },
      boxShadow: {
        cta: '0 4px 20px rgba(234, 88, 12, 0.45)',
        card: '0 8px 30px rgba(15, 23, 42, 0.08)',
      },
      animation: {
        pulseRing: 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        floatUp: 'floatUp .8s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.55)' },
          '50%': { boxShadow: '0 0 0 14px rgba(37, 211, 102, 0)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      gridTemplateColumns: {
        services: 'repeat(auto-fill, minmax(260px, 1fr))',
      },
    },
  },
  plugins: [],
};