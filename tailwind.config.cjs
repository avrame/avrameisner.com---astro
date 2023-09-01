/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			serif: "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
			sans: "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
		},
		extend: {},
	},
	plugins: [],
}
