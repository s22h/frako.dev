import Link from "next/link";
import { Post } from "../../src/types";

type PageProps = {
	posts: Post[];
};

export default function PostList({ posts }: PageProps) {
	return (
		<>
			{posts.map(post => (
				<li key={post.uri}>
					<Link href={post.uri}>
						<a className="no-underline">{post.title}</a>
					</Link>
				</li>
			))}
		</>
	);
}
