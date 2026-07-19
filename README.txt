ICAD FIFA World Cup 2026 — Winners Reveal
=========================================

How to edit:
- winners.json    -> change names, departments, points, accuracy, and which
                     image each winner uses. Also controls trophy/stadium
                     images and the "Moments" gallery list.
- assets/         -> winner card images + trophy + stadium. Replace files
                     (keep the same filename) or add new ones and update
                     the "image" path in winners.json.
- moment-images/  -> images used in the Moments gallery. List them under
                     "moments" in winners.json.

How to run locally:
  Any static server works. Easiest:
    npx serve .
  or
    python3 -m http.server 8000
  Then open http://localhost:8000
