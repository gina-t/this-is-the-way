
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.{html,js}',
    './components/**/*.{html,js}',
    './public/index.html',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/public/assets/carrots.jpg')",
      }
    },
    fontFamily: {
      'sans': ['Cupidus', 'Helvetica', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ], 
}
