import Layout from "../src/components/layout";
import Main from "../src/components/main";

export default function LegalInformationPage() {
	return (
		<Layout title="Legal Information" uri="/legal-information">
			<Main>
				<h1>Legal information</h1>

				<div className="prose my-8">
					<h2>Provider and responsible for the content</h2>
					<p>
						<b>frako.dev</b>
						<br />
						Steffen Franzkoch
						<br />
						Fidel-Feederle-Str. 12
						<br />
						78727 Oberndorf am Neckar
						<br />
						Germany
					</p>
					<p>
						<a href="mailto:legal@frako.dev">legal@frako.dev</a>
					</p>
				</div>
			</Main>
		</Layout>
	);
}
