# Mohamed Hamila — GitHub Pages deployment

This folder is the web root. Upload **the contents of this folder**, not the parent folder or the original HTTrack mirror. `index.html` must be at the root of the GitHub repository.

## Deploy
1. Create or open your GitHub repository (e.g. `mohamedhamila-website`).
2. Upload all files and folders from this package to the `main` branch at the repository root, including `projects`, `framerusercontent.com`, `index.html`, `.nojekyll`, and the other HTML pages.
3. Under **Settings → Pages**, select **Deploy from a branch** → **main** → **/(root)** and save.
4. Your URL will be `https://USERNAME.github.io/REPO/` (substitute your username and repo).

## Notes
- The Framer markup, component styles, interactions, and remote runtime have been retained. Framer's JavaScript (`framerusercontent.com/.../script_main...mjs`) is fetched from the original provider, so the animations depend on that service remaining online and allowing the site to run.
- Contact forms on the homepage and About page send to `https://formspree.io/f/mqpeygld`. Verify the Formspree recipient address and test a real submission after publication.
- Internal page links use `.html` filenames; avoid appending another `.html` (for example the correct URL is `/projects/seven-real-estate.html`).
- GitHub Pages is static hosting. Server-side Framer-only services cannot be guaranteed to work independently of Framer.


## October 2026 navigation and contact fix
- Added `github-pages-fix.js` to load pages as real static HTML files instead of relying on Framer's hosted SPA router. Framer page animations and styles are retained.
- Contact navigation goes to `index.html#contact`; Formspree forms submit to `https://formspree.io/f/mqpeygld`.
- Corrected email links to `Mohamedhamilaa1@gmail.com`.
- Upload the contents of this folder to the root of the GitHub Pages deployment branch, including `framerusercontent.com` and other asset directories.
- A patch-only ZIP is also available if you already uploaded the full site; replace its HTML pages and add `github-pages-fix.js`.
- Test on GitHub Pages after deployment; direct browser testing was not possible here.
