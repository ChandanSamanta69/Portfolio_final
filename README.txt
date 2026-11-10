# Chandan Samanta — Ultron Portfolio (3D / cinematic)

## Run it locally
Open `index.html` in Chrome, Edge or Firefox, or use VS Code "Live Server".

## Folder layout (what must be present before deploying)
- index.html, styles.css, script.js, scene.js, data.js   — the site
- vendor/three.min.js        — Three.js r128 (3D scene). REQUIRED, keep it.
- favicon.svg, 404.html, robots.txt, netlify.toml        — deploy files
- assets/portrait.jpg        — portrait in the About section
- assets/signature.png       — signature in the hero + contact section
- assets/resume.pdf          — linked from the "Résumé" button
- assets/certificates/<file> — original documents (names = `file` in data.js)
- assets/previews/<prev>     — JPG previews of each document (names = `prev` in data.js)

Anything missing in assets/ does NOT break the page: the portrait shows a "CS" monogram,
the signature is drawn in a script font, certificates show a styled document card,
and the Résumé / "Open original" buttons hide themselves until the file exists.
(The résumé/original checks only run on a web server, e.g. Netlify or Live Server.)

## Deploy on Netlify (free)
Option A — drag & drop (easiest)
  1. Go to https://app.netlify.com/drop and sign in (GitHub / Google / email).
  2. Drag the WHOLE "Chandan_er_Portfolio" folder onto the page. Done — you get a live URL.
  3. Site configuration → Change site name → e.g. "chandan-samanta" → chandan-samanta.netlify.app
  4. To update later: Deploys tab → drag the folder again.
Option B — from GitHub (auto-deploys on every push)
  1. Push this folder to a repo on github.com/ChandanSamanta69.
  2. Netlify → Add new site → Import from Git → pick the repo.
     Build command: (leave empty)   Publish directory: .
No build step is needed; netlify.toml already sets caching + security headers.

## Editing content
Everything (experience, projects, skills, certificates, honours) lives in data.js.
- Add a certificate: drop the file into assets/certificates/, a JPG preview into
  assets/previews/, then add one line to CERTS in data.js.
- Hero numbers (internships, certificates, projects) are counted from data.js automatically.
- Experience cards link to certificates through their `certs: [...]` ids.

## Fonts
Headings: Algerian (Windows) → Cinzel fallback. Body: Times New Roman.
Signature fallback uses Great Vibes (Google Fonts).

## Notes
- Phone number from the résumé is intentionally not shown on the page.
- Respects "reduce motion"; custom cursor is disabled on touch devices.

## Before deploying
The "zip_all" folder holds the raw originals (incl. a 54 s screen-recording video and two 11 MB PDFs).
The site does NOT use it — everything it needs is already in assets/ (optimised).
Move "zip_all" OUT of this folder before dragging onto Netlify Drop, otherwise it gets published too.
