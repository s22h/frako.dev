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

	return (
		<div className="text-main">
			<Head>
				<title>{title ? `${title} ∴ ` : ""}frako.dev</title>
				<link rel="canonical" href={`${BASE_URL}${uri}`} />
			</Head>
			<header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-4 shadow-md grid grid-cols-2">
				<div>
					<Link href="/">
						<a className="text-xl text-white hover:text-primary">frako.dev</a>
					</Link>
				</div>
				<nav className="flex space-x-4 items-center justify-end">
					<Link href="/">
						<a className={`${router.pathname == "/" ? "text-primary" : "text-white"} hover:text-primary`}>Blog</a>
					</Link>
					<Link href="/legal-information">
						<a
							className={`${
								router.pathname == "/legal-information" ? "text-primary" : "text-white"
							} hover:text-primary`}>
							Legal
						</a>
					</Link>
				</nav>
			</header>

			<main className="px-8 my-16">{children}</main>
		</div>
	);
}
