# Eric Hartman, Senior Product Manager

My portfolio site, styled like a sports player page: a bio and career bests up top, then tabs for my work, case studies, side projects and background.

**Live:** [eric-hartman-portfolio.vercel.app](https://eric-hartman-portfolio.vercel.app/)

Each tab has its own link, so you can send someone straight to one:

- [Work](https://eric-hartman-portfolio.vercel.app/#work): roles, stats and a career timeline
- [Highlights](https://eric-hartman-portfolio.vercel.app/#highlights): four case studies, from problem to result
- [Projects](https://eric-hartman-portfolio.vercel.app/#projects): side projects I built with Claude
- [About](https://eric-hartman-portfolio.vercel.app/#about): bio, interests, education and contact

## What's in here

| File | What it is |
|---|---|
| `index.html` | All the content. Each tab is a `<section>` with an id that matches its tab: `work`, `highlights`, `projects`, `about`. |
| `styles.css` | The whole look, including the tablet and phone layouts at the bottom. |
| `script.js` | Switches tabs based on the link's `#hash`. Without JavaScript, every section shows in order. |
| `assets/eric-donna.jpg` | The header photo. |
| `Eric-Hartman-Resume.pdf` | The resume linked from the header and the About tab. |
| `favicon.svg`, `favicon.png`, `apple-touch-icon.png` | The home plate icon, plus fallbacks for older browsers and phone home screens. |

It's plain HTML, CSS and a little JavaScript. There's no build step and nothing to install.

## Making changes

- **Update copy:** edit the text in `index.html` directly. Search for the section id (for example `id="highlights"`) to find the right tab.
- **Swap the resume:** replace `Eric-Hartman-Resume.pdf` and keep the same file name, so the links keep working.
- **Change the photo:** replace `assets/eric-donna.jpg`. Keep it roughly 3:4 portrait; it's cropped to fit.
- **Add a role or project:** copy an existing `.row` (Work) or `.project` (Projects) block and edit it. The layout and zebra striping adjust on their own.

## Running it locally

Open `index.html` in a browser, or serve the folder so the tab links behave exactly as they do live:

```sh
python3 -m http.server 8000
```

Then go to http://localhost:8000.

## Deploying

Vercel deploys every push to `main`. Changes are live in about a minute.

## Design notes

- The reference is a sports broadcaster's player page: a navy masthead, condensed type for names and numbers, plain tables underneath.
- Colours are navy `#0a1a33` with one red accent, `#c8102e`. They're generic sports colours, not any team's palette.
- Type is [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) for headings and numbers, and [Barlow](https://fonts.google.com/specimen/Barlow) for body text, both from Google Fonts.
- Product stats are split from engineering stats the way baseball splits hitters from pitchers, so every role shows only the numbers that mattered there.

## Credits

Designed and built with Claude.
