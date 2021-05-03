import parse from "html-react-parser";
import Link from "next/link";

type Props = {
	content: string;
	excerpt?: boolean;
	uri?: string;
};

export default function PostBody({ content, excerpt, uri }: Props) {
	let contentOrExcerpt = content;
	let hasMarker = false;

	if (excerpt) {
		const matches = contentOrExcerpt.match(/^(.*)<!--\s*MORE\s*-->/s);

		if (matches) {
			contentOrExcerpt = matches[1];
			hasMarker = true;
		}
	}

	return (
		<>
			{parse(contentOrExcerpt)}
			{excerpt && hasMarker && uri ? (
				<p>
					<Link href={uri}>
						<a>Continue reading …</a>
					</Link>
				</p>
			) : (
				""
			)}
		</>
	);
}
