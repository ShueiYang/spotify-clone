/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        slideup: 'slideup 0.5s ease-in-out',
        slidedown: 'slidedown 0.5s ease-in-out'
      },
      keyframes: {
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 1, transform: 'none' },
          to: { opacity: 0, transform: 'translateY(25%)' },
        },
      }
    },
  },
  plugins: [],
}
