import Layout from "../src/components/layout";
import PostList from "../src/components/post-list";
import { Post } from "../src/types";
import { getPosts } from "../src/database";

export async function getStaticProps() {
	// TODO: pagination
	const posts = await getPosts();

	return {
		props: {
			posts
		}
	};
}

type PageProps = {
	posts: Post[];
};

export default function IndexPage({ posts }: PageProps) {
	return (
		<Layout uri="/">
			<div className="max-w-prose mx-auto">
				<h1>Recent blog posts</h1>

				<ul className="list-disc pl-4 my-8">
					<PostList posts={posts} />
				</ul>
			</div>
		</Layout>
	);
}
