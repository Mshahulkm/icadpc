# ICAD FIFA World Cup 2026 — Winners Reveal

A cinematic static website revealing the ICAD FIFA World Cup 2026 Prediction Contest champions.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static site is emitted to `dist/`. Deploy it to any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes `dist/` to GitHub Pages on every push to `main`.

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages** → **Build and deployment** → **Source: GitHub Actions**.
3. Push to `main`; the site deploys automatically.
