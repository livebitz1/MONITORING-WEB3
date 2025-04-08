/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
      ],
      
  // Add darkMode strategy - using media query by default
  darkMode: 'media',
  theme: {
    extend: {
      animation: {
        'blob': 'blob 7s infinite',
        'chart-bar': 'chart-bar 1s ease-out forwards',
        'in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'chart-bar': {
          '0%': {
            height: '0%',
          },
          '100%': {
            height: 'var(--height)',
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          }
        }
      },
      // Add safelist for animations to ensure they're included in production builds
      safelist: [
        'animate-blob',
        'animate-chart-bar',
        'animate-in',
        'animation-delay-700',
        'animation-delay-1000',
        'animation-delay-1500',
        'animation-delay-2000',
        'animation-delay-4000',
      ]
    },
  },
  plugins: [],
}
