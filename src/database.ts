import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import { compareDesc } from "date-fns";
import { Post, Tag } from "./types";
import Authors from "../content/authors.json";
import Tags from "../content/tags.json";

const rootDir = path.resolve();

export type GetPostOptions = {
	limit?: number;
	offset?: number;
	includeDrafts?: boolean;
};

export async function getPost(slug: string): Promise<Post | null> {
	const file = fs.readdirSync(path.join(rootDir, "content/posts")).find(file => file.substr(5) == `${slug}.md`);
	if (!file) return null;

	return getPostsFromFiles([file], { limit: 0 }).then(posts => {
		if (posts.length) return posts[0];
		return null;
	});
}

export async function getPosts(options: GetPostOptions = {}): Promise<Post[]> {
	const files = fs.readdirSync(path.join(rootDir, "content/posts"));
	return getPostsFromFiles(files, options);
}

export async function getPostsByAuthor(slug: string, options: GetPostOptions = {}) {
	return (await getPosts(options)).filter(post => post.author.slug == slug);
}

export async function getPostsByTag(slug: string, options: GetPostOptions = {}) {
	return (await getPosts(options)).filter(post => post.tags.find(tag => tag.slug == slug));
}

async function getPostsFromFiles(files: string[], options: GetPostOptions) {
	options.limit = options.limit || 10;
	options.offset = options.offset || 0;

	let posts = files.slice(options.offset, options.offset + options.limit).map(
		(file): Post => {
			const fileData = fs.readFileSync(path.join(rootDir, "content/posts", file));
			const frontmatter = matter(fileData);

			const author = Authors.find(author => author.slug == frontmatter.data["author"]) || {
				name: "Unknown author",
				slug: "-"
			};
			const tags = (frontmatter.data["tags"] as string[]).map(slug => {
				const tag = Tags.find(tag => tag.slug == slug);
				if (tag) {
					return {
						...tag,
						uri: `/tag/${tag.slug}`
					};
				}
				return {
					name: `${slug[0].toLocaleUpperCase()}${slug.substr(1)}`,
					slug,
					uri: `/tag/${slug}`
				};
			}, new Array<Tag>(frontmatter.data["tags"].length));

			return {
				title: frontmatter.data["title"],
				slug: frontmatter.data["slug"],
				uri: `/post/${frontmatter.data["slug"]}`,
				body: marked(frontmatter.content),
				pubDate: frontmatter.data["pubDate"],
				author: {
					...author,
					uri: `/author/${author.slug}`
				},
				tags
			};
		}
	);

	if (!options.includeDrafts) {
		posts = posts.filter(post => post.pubDate !== null);
	}

	return posts.sort((a, b) => {
		const ad = new Date(a.pubDate);
		const bd = new Date(b.pubDate);
		return compareDesc(ad, bd);
	});
}
