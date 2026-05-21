# Boston Birthday Weekend

A standalone, mobile-first itinerary microsite for a family Boston weekend from May 22-25, 2026.

## What to open locally

Open `open-app.html` in Chrome. It is a standalone file with the styles, JavaScript, and itinerary data embedded.

## What to upload to GitHub Pages

Upload or replace `docs/index.html`. If you change this README, upload the root `README.md` too.

For a full public GitHub Pages setup checklist, see `GITHUB_PAGES.md`.

## How to edit the itinerary

Edit the files in `data/`:

- `data/itinerary.json` controls days, events, times, locations, details, and map links.
- `data/weather.json` controls the weather strip. It is placeholder planning guidance and does not update live.
- `data/photos.json` is reserved for a future photo section.
- `data/memory-photos.json` controls the eight hero collage photos.
- `data/flights.json` controls the arrivals and departures section.
- `data/site.json` controls the title, subtitle, hero note, and footer.
- `assets/photos/` stores the optimized photo files.

For map buttons, add a `mapUrl` to an event. For open-ended plans, add `"status": "open"` so the card looks intentional.

## How to rebuild

From this folder, run:

```bash
node scripts/build-standalone.mjs
```

That rebuilds:

- `open-app.html`
- `index.html`
- `docs/index.html`
- `publish/index.html`

## How to check the data

Run:

```bash
node scripts/check-data.mjs
```

This confirms the JSON files are readable and the itinerary has the required fields.

## Optional local preview

If you want to preview through a local URL instead of opening the standalone file directly, run:

```bash
node scripts/preview.mjs
```

Then open `http://127.0.0.1:4177`.

On Windows, you can also double-click `start-preview.cmd`.

## Folder structure

```text
Boston Birthday Weekend/
  index.html
  open-app.html
  README.md
  GITHUB_PAGES.md
  .gitignore
  src/
    index.template.html
    app.js
    styles.css
  data/
    itinerary.json
    weather.json
    photos.json
    memory-photos.json
    flights.json
    site.json
  assets/
    photos/
      memory-01.jpg
      ...
  scripts/
    build-standalone.mjs
    check-data.mjs
    preview.mjs
  publish/
    index.html
    README.md
  docs/
    index.html
    README.md
```
