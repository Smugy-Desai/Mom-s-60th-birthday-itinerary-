# Publish to GitHub Pages

Use this checklist to make the Boston Birthday Weekend site public.

## Files to upload

Upload the full `Boston Birthday Weekend` folder to a GitHub repository.

The most important public page file is:

```text
docs/index.html
```

GitHub Pages should be configured to serve from the `docs` folder.

## Recommended repository settings

1. Create a new public GitHub repository.
2. Upload all files and folders from `Boston Birthday Weekend/`.
3. Go to `Settings` > `Pages`.
4. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/docs`
5. Save.

GitHub will publish the page after a short build. The URL will usually look like:

```text
https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/
```

## After edits

Whenever the itinerary, flights, weather, or photo placeholders change:

```bash
node scripts/check-data.mjs
node scripts/build-standalone.mjs
```

Then upload or replace:

```text
docs/index.html
```

If you changed instructions, also upload:

```text
README.md
GITHUB_PAGES.md
```

## Local preview

Open `open-app.html` directly in Chrome, or double-click:

```text
start-preview.cmd
```
