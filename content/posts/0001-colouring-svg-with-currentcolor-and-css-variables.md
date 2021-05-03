---
title: Colouring SVG with currentColor and CSS variables
slug: colouring-svg-with-currentcolor-and-css-variables
author: frako
tags: [programming, webdev]
pubDate: "2021-05-03T18:18:07.324Z"
---

There are three ways to add SVG images to a website.

1. inline SVG in the HTML
2. add an external SVG image with `<use>`
3. add an external SVG image with `<img>`

The first two of those can be coloured with the `currentColor` CSS value and with CSS variables.

<!-- MORE -->

Browser support is good for both methods, inline SVG with `currentColor` works all the way back to Internet Explorer 11.

Personally, I'd recommend `<use>` (because of caching) with CSS variables (multiple variable colours possible).

## External SVG (&lt;use&gt;) with CSS variables

### External SVG

```
<svg version="1.1" width="220" height="100" viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
	<g id="rect">
		<rect x="0" y="0" width="100" height="100" fill="var(--rect-colour)" />
		<rect x="120" y="0" width="100" height="100" fill="var(--rect-colour-2)" />
	</g>
</svg>
```

### &lt;use&gt; to include the image

```
<style>
	.use-svg {
		--rect-colour: #ff0;
		--rect-colour-2: #0ff;
	}

	.use-svg:hover {
		--rect-colour: #f0f;
		--rect-colour-2: #0f8;
	}
</style>

<div class="use-svg">
	<svg>
		<use xlink:href="colouring_svg_css_variables.svg#rect" />
	</svg>
</div>
```

### Preview

<style>
	.use-svg {
		--rect-colour: #ff0;
		--rect-colour-2: #0ff;
	}

	.use-svg:hover {
		--rect-colour: #f0f;
		--rect-colour-2: #0f8;
	}
</style>

<div class="use-svg">
	<svg>
		<use xlink:href="/images/colouring_svg_css_variables.svg#rect" />
	</svg>
</div>

## Inline SVG with currentColor

```html
<div style="color: #f00">
	<svg version="1.1" width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<rect x="0" y="0" width="100" height="100" fill="currentColor" />
	</svg>
</div>
```

### Preview

<div style="color: #f00">
	<svg version="1.1" width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<rect x="0" y="0" width="100" height="100" fill="currentColor" />
	</svg>
</div>

## Inline SVG with CSS variables

```html
<div style="--rect-colour: #0f0;">
	<svg version="1.1" width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<rect x="0" y="0" width="100" height="100" fill="var(--rect-colour)" />
	</svg>
</div>
```

### Preview

<div style="--rect-colour: #0f0; --rect-colour-2: #00f;">
	<svg version="1.1" width="220" height="100" viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
		<rect x="0" y="0" width="100" height="100" fill="var(--rect-colour)" />
		<rect x="120" y="0" width="100" height="100" fill="var(--rect-colour-2)" />
	</svg>
</div>
