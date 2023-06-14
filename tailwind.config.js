/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  theme: {
	  screens: {
		  'sm': '600px',
		  'md': '768px',
		  'lg': '1024px',
		  'xl': '1200px',
		  '2xl': '1400px',
	  },
    extend: {},
  },
  plugins: [],
}

