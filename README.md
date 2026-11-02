# j-nistler.github.io

The code behind my personal website, [jnistler.dev](https://jnistler.dev).

## Edit the content

All content lives in the `<main id="profile">` block in `index.html`. The
terminal in `my-terminal.js` builds its directories from that markup, so you
only edit it in one place.

- Each `<section id="...">` becomes a terminal directory with that name.
- The `<h1>` is the ASCII-art banner, and the `<header>` paragraph is the tagline.
- `data-color="yellow"` (or another color name) colors that text in the terminal.

After a content change, update `<lastmod>` in `sitemap.xml`.
