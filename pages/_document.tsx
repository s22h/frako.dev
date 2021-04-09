import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default class CustomDocument extends Document {
	render() {
		return (
			<Html lang="en" className="lg:text-lg">
				<Head>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/site.webmanifest" />

					<meta name="theme-color" content="#1d1b20" />
					<meta name="description" content="The personal blog of full-stack developer Frako" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
