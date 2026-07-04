# ICAD FIFA Prediction Contest – Champions Reveal

A standalone, cinematic, FIFA-inspired website that reveals the group stage champions of the ICAD FIFA Prediction Contest. Click the football to score a goal — confetti, stadium flash, and a champion reveal video play automatically.

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- No backend, no build step, no dependencies

## File structure
```
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── reveal-video.mp4
```

## Run locally
Just open `index.html` in a browser. For full autoplay/audio support, serve it with a tiny static server:

```bash
# Python 3
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy
Upload the entire folder to any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any web server.

### GitHub Pages
1. Create a new GitHub repository.
2. Upload all files (including the `assets/` folder).
3. In repo Settings → Pages, set source to `main` branch, root.
4. Your site will be live at `https://<user>.github.io/<repo>/`.

## Customization
- Replace `assets/reveal-video.mp4` with your own champions reveal video.
- Edit the headline and CTA copy in `index.html`.
- Tweak colors in `:root` inside `style.css`.
