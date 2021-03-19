import { GetStaticPropsContext } from "next";
import Layout from "../../src/components/layout";
import PostList from "../../src/components/post-list";
import { getPostsByAuthor } from "../../src/database";
import { Author, Post } from "../../src/types";
import Authors from "../../content/authors.json";

export async function getStaticPaths() {
	return {
		paths: Authors.map(author => {
			return { params: { slug: author.slug } };
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
	const posts = await getPostsByAuthor(params.slug as string);

	if (!posts) {
		return {
			notFound: true
		};
	}

	const author = posts[0].author;

	return {
		props: {
			posts,
			author
		}
	};
}

type PageProps = {
	posts: Post[];
	author: Author;
};

export default function AuthorPage({ posts, author }: PageProps) {
	return (
		<Layout title={author.name} uri={author.uri}>
			<div className="max-w-prose mx-auto">
				<h1>
					Posts by <b>{author.name}</b>
				</h1>

				<ul className="list-disc pl-4 my-8">
					<PostList posts={posts} />
				</ul>
			</div>
		</Layout>
	);
}