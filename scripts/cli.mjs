import fs from "fs";
import path from "path";
import yargs from "yargs";
import matter from "gray-matter";

const rootDir = path.resolve();

const args = yargs(process.argv.slice(2))
	.command(
		["new post <title>", "np <title>"],
		"Create a new post",
		yargs => {
			yargs.positional("title", {
				describe: "The title of the new blog post",
				type: "string"
			});
		},
		args => {
			// read existing posts and get the last one by file name (sorts by the prefixed index)
			const files = fs.readdirSync(path.join(rootDir, "content/posts")).sort((a, b) => b.localeCompare(a));
			let index = 0;

			if (files) {
				const lastIndex = parseInt(files[0].substr(0, 4));
				index = lastIndex + 1;
			}

			const slug = slugify(args.title);

			if (
				files.findIndex(file => {
					return file.substr(5) === `${slug}.md`;
				}) != -1
			) {
				console.error("The title/slug already exists. No new post has been created.");
				return;
			}

			const filePath = `content/posts/${zeroes(index)}-${slug}.md`;

			fs.writeFileSync(
				path.join(rootDir, filePath),
				matter.stringify("\nThe content.", {
					title: args.title,
					slug,
					author: "frako",
					tags: [],
					pubDate: new Date().toISOString()
				})
			);

			console.log(`File ${filePath} has been created.`);
		}
	)
	.help().argv;

// pad a number with zeroes
function zeroes(num, places = 4) {
	let str = num.toString();
	while (str.length < places) {
		str = `0${str}`;
	}
	return str;
}

// Creates a url-valid slug from a text
function slugify(text) {
	return text
		.toLowerCase()
		.replace("ä", "ae")
		.replace("ö", "oe")
		.replace("ü", "ue")
		.replace("ß", "ss")
		.replace("æ", "ae")
		.replace("œ", "oe")
		.replace("ø", "oe")
		.replace(/[ |_]/g, "-")
		.normalize("NFKD")
		.replace(/[^a-zA-Z0-9\-]/g, "")
		.replace(/-+/g, "-")
		.replace(/^-/, "")
		.replace(/-$/, "");
}
