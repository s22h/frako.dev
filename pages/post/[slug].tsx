import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { format, formatISO } from "date-fns";
import Layout from "../../src/components/layout";
import { Post } from "../../src/types";
import { getPost, getPosts } from "../../src/database";
import PostBody from "../../src/components/post-body";

export async function getStaticPaths() {
	return {
		paths: (await getPosts()).map(post => {
			return { params: { slug: post.slug } };
		}),
		fallback: false
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	if (!params?.slug) {
		return {
			notFound: true
		};
	}

	// TODO: pagination
	const post = await getPost(params.slug as string);

	if (!post) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			post
		}
	};
}

type PageProps = {
	post: Post;
};

export default function PostPage({ post }: PageProps) {
	const pubDate = new Date(post.pubDate);

	return (
		<Layout title={post.title} uri={post.uri}>
			<article className="mx-auto max-w-prose lg:max-w-full grid lg:grid-cols-article lg:grid-rows-article lg:gap-x-8 lg:justify-center">
				<h1>{post.title}</h1>
				<div className="prose lg:col-start-1 row-start-3 lg:row-start-2">
					<PostBody content={post.body} />
				</div>

				<aside className="text-sm lg:text-base mb-4 mt-8 lg:mt-0 lg:col-start-2 row-start-2 lg:row-start-1 lg:row-end-3">
					<div className="lg:p-4 lg:border lg:border-gray-100 lg:shadow-lg">
						Written by{" "}
						<Link href={post.author.uri}>
							<a>{post.author.name}</a>
						</Link>
						<time className="block mt-4" dateTime={formatISO(pubDate)}>
							{format(pubDate, "EEEE, d MMMM yyyy HH:mm")}
						</time>
						<div className="mt-4">
							<ul className="inline-flex flex-wrap">
								<li className="mr-2">Tags:</li>
								{post.tags.map(tag => (
									<li key={tag.uri} className="mr-2">
										<Link href={tag.uri}>
											<a>{tag.name}</a>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</aside>
			</article>
		</Layout>
	);
}
