import { format } from "date-fns";
import Link from "next/link";
import { Post } from "../../src/types";
import PostBody from "./post-body";

type PageProps = {
	posts: Post[];
};

export default function PostList({ posts }: PageProps) {
	return (
		<div className="divide-y divide-gray-200 space-y-8">
			{posts.map(post => (
				<article key={post.uri} className="pt-8">
					<h2 className="text-xl">
						<Link href={post.uri}>
							<a>{post.title}</a>
						</Link>
					</h2>

					<time className="block my-4" dateTime={post.pubDate}>
						{format(new Date(post.pubDate), "EEEE, d MMMM yyyy, HH:mm")}
					</time>

					<div className="prose">
						<PostBody content={post.body} excerpt uri={post.uri} />
					</div>
				</article>
			))}
		</div>
	);
}
