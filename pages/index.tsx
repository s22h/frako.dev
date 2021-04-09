import Layout from "../src/components/layout";
import PostList from "../src/components/post-list";
import { Post } from "../src/types";
import { getPosts } from "../src/database";
import Main from "../src/components/main";

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
			<Main>
				<h1>Recent blog posts</h1>

				<PostList posts={posts} />
			</Main>
		</Layout>
	);
}
