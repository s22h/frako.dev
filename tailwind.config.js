const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ["Roboto", "sans-serif"]
		},
		extend: {
			colors: {
				primary: "#ff0055",
				main: colors.coolGray["700"],
				orange: colors.orange,
				gray: colors.coolGray
			},
			gridTemplateColumns: {
				article: "minmax(auto, 64ch) 32ch",
				list: "max-content 1fr"
			},
			gridTemplateRows: {
				article: "auto 1fr"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
