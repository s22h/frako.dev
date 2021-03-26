import { format } from "date-fns";
import Link from "next/link";
import { Post } from "../../src/types";
import PostBody from "./post-body";

type PageProps = {
	posts: Post[];
};

export default function PostList({ posts }: PageProps) {
	return (
		<div className="mb-8 space-y-8 divide-y divide-gray-200">
			{posts.map(post => (
				<article key={post.uri} className="pt-8">
					<h2 className="text-xl">
						<Link href={post.uri}>
							<a>{post.title}</a>
						</Link>
					</h2>

					<time className="block my-4" dateTime={post.pubDate}>
						{format(new Date(post.pubDate), "dd.MM.yyyy HH:mm")}
					</time>

					<div className="prose">
						<PostBody content={post.body} excerpt />
					</div>
				</article>
			))}
		</div>
	);
}
