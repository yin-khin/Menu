/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '380px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        mint: { DEFAULT: '#E8F7F4', soft: '#B2E8DD' },
        brand: { DEFAULT: '#00BFA5', bright: '#00D6B5', dark: '#00967F' },
        ink: { DEFAULT: '#263238', soft: '#607D8B' },
      },
      fontFamily: {
        khmer: ['"Kantumruy Pro"', 'sans-serif'],
        english: ['Arial', 'Helvetica', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(38, 50, 56, 0.08)',
        lift: '0 12px 32px rgba(0, 191, 165, 0.22)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease-out both',
        'fade-in': 'fadeIn 0.25s ease-out both',
        'pop-in': 'popIn 0.28s ease-out both',
        shimmer: 'shimmer 1.4s linear infinite',
      },
    },
  },
  plugins: [],
};
