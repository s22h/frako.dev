import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { Post } from "../../src/types";

type PageProps = {
	posts: Post[];
};

export default function PostList({ posts }: PageProps) {
	return (
		<ul className="my-8 space-y-4">
			{posts.map(post => (
				<li key={post.uri}>
					<Link href={post.uri}>
						<a className="block text-xl">{post.title}</a>
					</Link>
					<time className="block" dateTime={post.pubDate}>
						{format(new Date(post.pubDate), "dd.MM.yyyy HH:mm")}
					</time>
				</li>
			))}
		</ul>
	);
}
