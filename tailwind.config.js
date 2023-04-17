module.exports = {
  content: ["./pages//**/**/*.{js,jsx,ts,tsx}",
   './components/**/**/*.{js,ts,jsx,tsx}',
   './src/**/*.{html,js}', 
   './node_modules/tw-elements/dist/js/**/*.js'
],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ],
}
