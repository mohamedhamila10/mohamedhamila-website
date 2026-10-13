# Mohamed Hamila Portfolio — GitHub Pages

Static copy of a Framer portfolio website, exported from an HTTrack mirror. This is not the original editable Framer project.

## Publish on GitHub Pages

1. Create a GitHub repository (e.g. `portfolio`).
2. Upload the **contents of this folder** to the repository root on the `main` branch.
3. Open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
4. The project will be accessible at `https://YOUR-USERNAME.github.io/portfolio/` after deployment. For a repository named `YOUR-USERNAME.github.io`, it is served at the user-domain root.

## Before publishing

- Replace `designer@example.com` and `+1 (555) 123-4567` with real contact details, or remove them.
- `projects/dr-acne-packaging-design.html` appears to contain a fallback/error page rather than the expected project. Re-export that project.
- Confirm fonts, video embeds, navigation, motion effects, and any forms work. Some scripts and modules load from Framer's external domain.
- Several very large portfolio images should be compressed/replaced with WebP/AVIF for speed.
- This snapshot may require another download if the original Framer site changes.

## Local preview

From this directory: `python -m http.server 8000`, then open http://localhost:8000/.

The HTTrack index and cache files have been excluded, and the actual homepage moved to the website root.
