# guptasaloni.com

Personal academic website of Saloni Gupta (Brown University).

Plain HTML and CSS, no build step. GitHub Pages serves the files on the `main` branch as they are.

## Files

- `index.html`, `research.html`, `teaching.html`: the three pages. The header and footer are repeated in each page, so a change to them goes in all three.
- `assets/style.css`: every font, size, color and spacing rule for the site.
- `assets/site.js`: one-at-a-time expandable items, opening a paper from a link such as `research.html#phone`, and the figure enlarger on Home.
- `assets/headshot.jpg`, `assets/figures/`, `assets/photos/`: images.

## Making a change

Edit the page, check it locally, then commit and push to `main`. The live site updates within a few minutes.

To preview locally from this folder:

```
python3 -m http.server 8742
```

then open http://localhost:8742.
