// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Adjust to your file structure
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],  // Add your custom font here
      },
      zIndex: {
        1: "1",
      },
      screens: {
        'smw': '100px', // Custom breakpoint cho màn hình 537px
      }
    },
  },
  plugins: [],
}
