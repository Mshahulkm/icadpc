# ICAD FIFA World Cup 2026 – Winners Reveal

Static site (HTML/CSS/JS only). Ready for GitHub Pages.

## Deploy on GitHub Pages
1. Create a new repository and push all these files to the `main` branch (root).
2. In the repo: **Settings → Pages → Source: Deploy from branch → main / (root)** → Save.
3. Your site will be live at `https://<username>.github.io/<repo>/` in ~1 minute.

## Files
- `index.html` – entry
- `styles.css` – theme + animations
- `app.js` – all stages + penalty mini-game
- `winners.json` – edit names, department, points, accuracy
- `assets/` – winner photos + stadium + trophy (replace with real photos, keep filenames)

## Editing winners
Open `winners.json`:
```json
{
  "champion":   {"name":"...", "department":"...", "points":298, "accuracy":94},
  "runnerup":   {"name":"...", "department":"...", "points":281, "accuracy":89},
  "third":      {"name":"...", "department":"...", "points":264, "accuracy":84},
  "topScorer":  {"name":"...", "department":"...", "points":251, "accuracy":81}
}
```

## Replacing photos
Drop your images into `/assets/` using these exact filenames:
- `winner-champion.jpg`
- `winner-runnerup.jpg`
- `winner-third.jpg`
- `winner-topscorer.jpg`

That's it – no build step required.
