import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

type LayoutProps = {
	title?: string;
	uri: string;
};

const BASE_URL = "https://frako.dev";

export default function Layout({ title, uri, children }: PropsWithChildren<LayoutProps>) {
	const router = useRouter();

	const active = (path: string) => {
		let rp = router.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
		let p = path.replace(/^\/+/, "").replace(/\/+$/, "");
		return `${rp}/`.startsWith(`${p}/`);
	};

	return (
		<div className="w-full min-h-screen text-main bg-gray-900 bg-main bg-center bg-cover bg-fixed pb-px -mb-px">
			<Head>
				<title>{title ? `${title} ∴ ` : ""}frako.dev</title>
				<link rel="canonical" href={`${BASE_URL}${uri}`} />
			</Head>
			<header className="text-white px-8 py-4 grid grid-cols-2">
				<div>
					<Link href="/">
						<a className="text-xl text-white hover:text-primary">frako.dev</a>
					</Link>
				</div>
				<nav className="flex space-x-4 items-center justify-end">
					<Link href="/">
						<a
							className={`${
								active("/post") || active("/tag") || active("/author") || router.pathname == "/"
									? "text-primary"
									: "text-white"
							} hover:text-primary`}>
							Blog
						</a>
					</Link>
					<Link href="/legal-information">
						<a className={`${active("/legal-information") ? "text-primary" : "text-white"} hover:text-primary`}>
							Legal
						</a>
					</Link>
				</nav>
			</header>

			{children}
		</div>
	);
}
