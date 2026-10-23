# Garden Pairs and Garden Glance

A portable source-code export of both browser games, including all embedded assets.

## Run locally

1. Extract this ZIP.
2. Open a terminal in the extracted `garden-pairs` folder.
3. Run: `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist`
   On Windows, use `py` instead of `python3` if needed.
4. Open http://localhost:8000 in your browser.
5. Choose Garden Glance to switch to the visual-attention activity.

Python 3 is only needed for this convenient local web server. The games themselves
use plain HTML, CSS and JavaScript and can be served by any static web server.
No npm installation, build step, API keys, database or backend is required.
Use a local web server rather than opening the HTML files directly, because
Garden Glance uses links back to the website root.

## Files

- `dist/index.html`: Garden Pairs, with embedded styles, game logic and emoji artwork.
- `dist/glance.html`: Garden Glance layout, styles and instructions.
- `dist/glance.js`: Garden Glance logic and inline SVG picture assets.
- `ASSETS.md`: location and editing notes for the artwork.
- `EXPORT.json`: source revision and SHA-256 checksums for the application files.

## Features

Garden Pairs: picture matching with 4, 6 or 8 pairs, garden/fruit/animal themes,
optional picture reveal and player-controlled card turning.

Garden Glance: garden, fruit, animal and everyday-object themes; picture recognition
with optional butterfly-location questions; automatic brief presentations; longer
practice viewing; eight-picture rounds; adaptive display duration; pause and finish.
Answers are untimed. Results are held in the open page, without a game-results backend.

## Editing and hosting

Edit the files in `dist` directly and refresh your browser. Upload the contents of
`dist` to the root of any static website to host both games. Hosting under a subfolder
requires adjusting the root links (`href="/"`) in `glance.html`.

The export does not include service-specific deployment settings, Git history,
authentication credentials or account access controls. Access controls for another
host must be configured on that host.

## Activity scope

Garden Glance is an experimental activity, not a validated clinical intervention
or cognitive assessment. Brief display times vary with browser and screen behaviour.
The research reference in the About section is optional reading; the game code has
no external runtime dependencies. Emoji appearance depends on the device font.

Exported 23 October 2026 (Australia/Brisbane).
Source commit: a3585d1efbaa4aa46432f58f3fb67aa7f0f0c310
