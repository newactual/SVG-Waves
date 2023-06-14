/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  theme: {
	  screens: {
		  'xs': { 'max': '567px' },
		  'tablet': '980px',
		  'xmd': '1080px',
		  'xlg': '1440px',
	  },
    extend: {},
  },
  plugins: [],
}

