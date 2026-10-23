# Memoryium

A quiet space for matching and attention games. Memoryium brings together
**Matching Pairs** and **Glance**, adapted from the Garden Pairs / Garden Glance
export supplied on 23 October 2026.

- **Matching Pairs:** find 4, 6, or 8 pairs, with garden, fruit, or animal pictures.
  Reveal pictures when you like and turn mismatches back at your own pace.
- **Glance:** briefly view a picture, then identify it, optionally recalling a
  butterfly's position too. Includes practice, eight-picture rounds, pause, and
  gradual changes to viewing duration. Answers are untimed.

## Run

With Node.js 22 or later:

```sh
npm start
```

Open <http://127.0.0.1:8000>. No dependency installation is needed to run the app.
Alternatively, run `python -m http.server 8000 --bind 127.0.0.1 --directory public`.

## Develop

```sh
npm ci
npm test
npm run format:check
```

Browser tests use an installed Microsoft Edge. To use Playwright's bundled
Chromium instead, remove `channel: "msedge"` from `playwright.config.js` and run
`npx playwright install chromium`.

The app uses plain HTML, CSS, and JavaScript. Edit `public/` directly; no build
step is required. Each activity has its own stylesheet and script, and shared
branding lives in `public/styles/memoryium.css`.

## Host

Serve `public/` with any static web server. Relative navigation and asset URLs
support both domain-root and subfolder hosting. `scripts/serve.mjs` is a local
development server bound to loopback.

## Source and review

[Code review](docs/REVIEW.md) records findings, fixes, and remaining limitations.
The original export documentation and checksum manifest are retained in
`docs/source/`; their paths and hashes refer to the original ZIP, not the edited
Memoryium application. The ZIP's three application checksums were verified
before import. No source license was included in the supplied export.

All pictures are embedded emoji or SVG. There are no external runtime assets,
API calls, accounts, analytics, or saved game results. Emoji appearance varies
by device. Glance is an experimental activity and is not a validated clinical
intervention or cognitive assessment.
