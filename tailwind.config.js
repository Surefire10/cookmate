/** @type {import('tailwindcss').Config} */
const { withUt } = require("uploadthing/tw");

module.exports = withUt({

  content: [
    './app/*.{ts,tsx,mdx}',
    './app/auth/**/*.{ts,tsx,mdx}',
    './app/components/*.{ts,tsx,mdx}',
    "./app/**/*.{ts,tsx,mdx}"

    

  ],
  theme: {
    extend: {
      colors: {
        yellow: {
        
          500: '#f4cd32',

        },
      }
    },
  },      
    
    plugins: [],

})
