export type Tag = {
	name: string;
	slug: string;
	uri: string;
};

export type Author = {
	name: string;
	slug: string;
	uri: string;
};

export type Post = {
	title: string;
	slug: string;
	uri: string;
	body: string;
	pubDate: string;
	tags: Tag[];
	author: Author;
};
