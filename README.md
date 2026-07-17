# ICAD FIFA World Cup 2026 — Winners Reveal (Static Site)

Pre-built static site. Ready to host on any static host.

## Deploy to GitHub Pages
1. Create a new GitHub repository.
2. Upload all files (including the `.github` folder and `.nojekyll`) to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Push (or run the workflow manually). Your site will be live at the URL shown in the Actions run.

## Test locally
Open a terminal in this folder and run any static server, e.g.:
```
npx serve .
```
Then visit http://localhost:3000

Note: opening `index.html` by double-clicking will not work — browsers block ES module scripts on `file://` URLs. Always serve over HTTP.
