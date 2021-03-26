import { GetStaticPropsContext } from "next";
import Layout from "../../src/components/layout";
import PostList from "../../src/components/post-list";
import { getPostsByTag } from "../../src/database";
import { Post, Tag } from "../../src/types";
import Tags from "../../content/tags.json";

export async function getStaticPaths() {
	return {
		paths: Tags.map(tag => {
			return { params: { slug: tag.slug } };
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
	const posts = await getPostsByTag(params.slug as string);

	if (!posts) {
		return {
			notFound: true
		};
	}

	const tag = posts[0].tags.find(tag => tag.slug == params?.slug);

	return {
		props: {
			posts,
			tag
		}
	};
}

type PageProps = {
	posts: Post[];
	tag: Tag;
};

export default function CategoryPage({ posts, tag }: PageProps) {
	return (
		<Layout title={tag.name} uri={tag.uri}>
			<div className="max-w-prose mx-auto">
				<h1>
					Posts tagged <b>{tag.name}</b>
				</h1>

				<PostList posts={posts} />
			</div>
		</Layout>
	);
}
