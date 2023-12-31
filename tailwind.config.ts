import type { Config } from 'tailwindcss'
import { colors as defaultColors } from 'tailwindcss/defaultTheme'
import { withUt } from "uploadthing/tw";





export default withUt({

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
  
