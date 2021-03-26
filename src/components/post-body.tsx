import React, { createElement } from "react";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";

type Props = {
	content: string;
	excerpt?: boolean;
};

export default function PostBody({ content, excerpt }: Props) {
	let contentOrExcerpt = content;

	if (excerpt) {
		const matches = contentOrExcerpt.match(/^(.*)<!--\s*MORE\s*-->/s);

		if (matches) {
			contentOrExcerpt = matches[1];
		}
	}

	const processor = unified()
		.use(markdown)
		.use(remark2rehype)
		.use(rehype2react, { createElement: createElement, Fragment: React.Fragment });
	const body = processor.processSync(contentOrExcerpt).result as JSX.Element;
	return body;
}
